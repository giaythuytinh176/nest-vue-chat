import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [UsersModule],
  providers: [MessageGateway],
})
export class MessageModule {}
