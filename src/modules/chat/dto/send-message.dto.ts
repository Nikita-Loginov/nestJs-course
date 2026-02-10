import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  text: string;
}
