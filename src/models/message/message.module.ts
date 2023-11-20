import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/entities/user.entity';
import { Conversation } from 'models/conversation/entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationModule } from 'models/conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Conversation,
      Message
    ]),
    ConversationModule
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule { }
