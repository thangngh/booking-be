import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ConversationModule } from 'models/conversation/conversation.module';
import { MessageModule } from 'models/message/message.module';
import { UserModule } from 'models/user/user.module';
import { AppointmentModule } from 'models/appointment/appointment.module';
import { BookingHistoryModule } from 'models/booking_history/booking_history.module';

@Module({
    imports: [
        ConversationModule,
        MessageModule,
        UserModule,
        BookingHistoryModule,
        AppointmentModule
    ],
    providers: [SocketGateway],
    exports: []
})
export class SocketModule { }