import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/entities/user.entity';
import { Conversation } from './entities/conversation.entity';
import { Message } from 'models/message/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Conversation, Message
    ])
  ],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule { }
