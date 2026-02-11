import { generateCodeChallenge, generateCodeVerifier } from "@/infra/utils/pkce.util";
import { PrismaService } from "@/prisma/prisma.service";
import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { firstValueFrom } from "rxjs";
import { GetTracksDto } from "./dto/get-tracks.dto";
import { GetTrackStreamsDto } from "./dto/get-tracks-stream.dto";
import { Response } from "express";

@Injectable()
export class SoundcloudService {
  private client_id: string;
  private redirect_uri: string;
  private client_secret: string;

  private stateStore = new Map<string, string>();

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService
  ) {
    this.client_id = this.configService.getOrThrow<string>("SOUNDCLOUD_CLIENT_ID");
    this.client_secret = this.configService.getOrThrow<string>("SOUNDCLOUD_SECRET_ID");
    this.redirect_uri = this.configService.getOrThrow<string>("SOUNDCLOUD_REDIRECT_URI");
  }

  async authorization(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.soundcloudAccessToken && user.soundcloudTokenExpiresAt > new Date()) {
      return {
        access_token: user.soundcloudAccessToken,
        expires_in: Math.floor((user.soundcloudTokenExpiresAt.getTime() - Date.now()) / 1000),
      };
    }

    const state = crypto.randomUUID();
    this.stateStore.set(state, userId);

    const url =
      `https://secure.soundcloud.com/authorize` +
      `?client_id=${this.client_id}` +
      `&redirect_uri=${encodeURIComponent(this.redirect_uri)}` +
      `&response_type=code` +
      `&state=${state}`;

    return url;
  }

  async callback(code: string, state: string) {
    const userId = this.stateStore.get(state);

    if (!userId) {
      throw new NotFoundException("Invalid or expired state");
    }

    return this.getToken(code, userId);
  }

  async getToken(code: string, userId: string) {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: this.client_id,
      client_secret: this.client_secret,
      code,
      redirect_uri: this.redirect_uri,
    });

    const { data } = await firstValueFrom(
      this.httpService.post<IAuthResponse>(
        "https://secure.soundcloud.com/oauth/token",
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json; charset=utf-8",
          },
        }
      )
    );

    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    let user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          soundcloudAccessToken: data.access_token,
          soundcloudRefreshToken: data.refresh_token,
          soundcloudTokenExpiresAt: expiresAt,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          id: userId,
          soundcloudAccessToken: data.access_token,
          soundcloudRefreshToken: data.refresh_token,
          soundcloudTokenExpiresAt: expiresAt,
        },
      });
    }

    return data;
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        soundcloudAccessToken: true,
        soundcloudTokenExpiresAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    return user;
  }

  async getTracks(dto: GetTracksDto) {
    const { userId } = dto;

    const user = await this.getUser(userId);

    const { data } = await firstValueFrom(
      this.httpService.get("https://api.soundcloud.com/tracks", {
        headers: {
          accept: "application/json; charset=utf-8",
          authorization: `OAuth ${user.soundcloudAccessToken}`,
        },
        params: {
          limit: 10,
        },
      })
    );

    const tracks = data.map((track: any) => {
      const {user, ...rest} = track
      return rest;
    });

    return tracks;
  }
}
