import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";
import { SendMessageDto } from "./dto/send-message.dto";
import { UsePipes, ValidationPipe } from "@nestjs/common";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    // console.log("connect", client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log("disconect", client.id);
  }

  @SubscribeMessage('sendMessage')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  async handleSendMessage(@MessageBody() dto: SendMessageDto) {
    const message = await this.chatService.sendMessage(dto)

    this.server.emit('recMessage', message);

    return message;
  }
}
