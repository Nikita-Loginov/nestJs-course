import { Module } from "@nestjs/common";
import { SoundcloudService } from "./soundclound.service";
import { SoundcloudController } from "./soundclound.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [SoundcloudController],
  providers: [SoundcloudService],
})
export class SoundcloudModule {}
