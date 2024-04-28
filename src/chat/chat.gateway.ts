import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/payload.interface';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.chatService.registerClient(client, payload.sub);
    } catch (error) {
      client.disconnect();
      return;
    }
    // console.log({ payload });
    this.wss.emit('clients-updated', this.chatService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    this.chatService.removeClient(client.id);
    this.wss.emit('clients-updated', this.chatService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, message: NewMessageDto) {
    // client.emit('message-from-server', message);
    // client.broadcast.emit('message-from-server', message);
    this.wss.emit('message-from-server', {
      message,
      user: this.chatService.getUserBySocketId(client.id),
    });
  }
}
