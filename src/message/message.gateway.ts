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

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  // @Interval(10000)
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    // this.logger.debug('Called handleMessage after 5 seconds');

    let payload1: any;
    if (!payload) {
      payload1 = {
        name: this.makeid(10),
        text: this.makeid(5),
      };
    }
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
