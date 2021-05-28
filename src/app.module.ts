import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(
      process.env.mongoUrl ||
        'mongodb+srv://dbTamLe:OvWBDHb1L59JmQAa@cluster0-tamle.lzjkq.mongodb.net/websocketNestJS',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    UsersModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
