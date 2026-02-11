import { ISoundcloundOptions } from "@/modules/soundcloud/interface/soundclound-options.interface";
import { ConfigService } from "@nestjs/config";

export const getSoundcloudConfig = (configService: ConfigService): ISoundcloundOptions => {
  return {
    client_id: configService.getOrThrow<string>("SOUNDCLOUD_CLIENT_ID"),
    client_secret: configService.getOrThrow<string>("SOUNDCLOUD_SECRET_ID"),
    redirect_uri: configService.getOrThrow<string>("SOUNDCLOUD_REDIRECT_URI"),
  };
};
