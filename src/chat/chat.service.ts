import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectedClients } from 'src/interfaces/connectedClients.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  private connectedClients: ConnectedClients = {};

  constructor(private readonly prismaClient: PrismaService) {}

  async registerClient(client: Socket, userId: string) {
    try {
      const user = await this.prismaClient.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.is_active) {
        throw new Error('User is not active');
      }

      this.connectedClients[client.id] = {
        socket: client,
        user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  getUserBySocketId(socketId: string) {
    return this.connectedClients[socketId]?.user.fullName;
  }
}
