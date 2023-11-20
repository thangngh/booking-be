import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ConversationModule } from 'models/conversation/conversation.module';
import { MessageModule } from 'models/message/message.module';
import { UserModule } from 'models/user/user.module';

@Module({
    imports: [
        ConversationModule,
        MessageModule,
        UserModule
    ],
    providers: [SocketGateway],
    exports: []
})
export class SocketModule { }