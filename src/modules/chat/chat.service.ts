import { PrismaService } from "@/prisma/prisma.service";
import { Body, Injectable } from "@nestjs/common";
import { SendMessageDto } from "./dto/send-message.dto";
import { text } from "node:stream/consumers";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(@Body() dto: SendMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        text: dto.text,
      },
    });

    return message;
  }
}
