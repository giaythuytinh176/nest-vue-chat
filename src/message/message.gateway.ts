import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Interval } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly usersService: UsersService) {}

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  //@Interval(1000)
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    // this.logger.debug('Called handleMessage after 1 seconds');

    let payload1: any;
    if (!payload) {
      payload1 = {
        name: this.makeid(10),
        text: this.makeid(5),
      };
    }

    const payload2 = payload ?? payload1;
    const userText = await this.usersService.saveMessageUser(
      payload2.name,
      payload2.text,
    );

    this.logger.log(`Sending message: ${JSON.stringify(payload ?? payload1)}`);
    this.server.emit('msgToClient', payload ?? payload1);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('client', client);

    this.logger.log(`Client connected: ${client.id}`);
  }

  makeid(length) {
    const result = [];
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  }
}
