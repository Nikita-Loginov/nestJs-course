import { Body, Controller, Get, NotFoundException, Query, Res } from "@nestjs/common";
import { SoundcloudService } from "./soundclound.service";
import { Response } from "express";
import { ICallbackQuery } from "./interface/callback-query.interface";
import { AuthDto } from "./dto/auth.dto";
import { GetTracksDto } from "./dto/get-tracks.dto";
import { GetTrackStreamsDto } from "./dto/get-tracks-stream.dto";

@Controller("soundclound")
export class SoundcloudController {
  constructor(private readonly soundcloudService: SoundcloudService) {}

  @Get()
  async authorization(@Query() authDto: AuthDto, @Res() res: Response) {
    const { userId } = authDto;

    const result: string | { access_token: string; expires_in: number } =
      await this.soundcloudService.authorization(userId);

    if (typeof result !== "string" && "access_token" in result) {
      return res.json(result);
    }

    return res.redirect(result);
  }

  @Get("callback")
  async callback(@Query() query: ICallbackQuery) {
    const { code, state } = query;

    if (!code || !state) {
      throw new NotFoundException("Invalid callback params");
    }

    return this.soundcloudService.callback(code, state);
  }

  @Get("tracks")
  async getTracks(@Query() query: GetTracksDto) {
    return await this.soundcloudService.getTracks(query);
  }
}
