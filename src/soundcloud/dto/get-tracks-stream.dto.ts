import { IsNotEmpty, IsUUID } from "class-validator";

export class GetTrackStreamsDto {
  @IsNotEmpty({
    message: "Небходим userId",
  })
  @IsUUID("4", { message: "userId должен быть UUID v4" })
  userId: string;

  @IsNotEmpty({
    message: "Небходим trackId",
  })
  trackId: number;
}
