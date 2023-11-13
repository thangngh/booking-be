import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/entities/user.entity';
import { Conversation } from 'models/conversation/entities/conversation.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Conversation,
      Message
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule { }
