import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { ConversationService } from 'models/conversation/conversation.service';
import { MessageService } from 'models/message/message.service';
import { UserService } from 'models/user/user.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server!: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(
        private readonly conversationService: ConversationService,
        private readonly messageService: MessageService,
        private readonly userService: UserService
    ) { }

    getServer() {
        return this.server;
    }

    handleConnection(client: any) {
        this.logger.verbose("Client Connected ...!")
    }

    handleDisconnect(client: any) {
        this.logger.verbose("Client Disconnected ...!")
    }

    @SubscribeMessage("notify_booking")
    notifyBooking(client: Socket, payload: unknown) {

        const { doctor_Id, patient_id, patient_client_id, status } = payload

        const body = [doctor_Id, patient_id].map((value) => ({ userId: value }))

        const getDoctor = await this.userService.findUserById(doctor_Id)

        const doctorName = getDoctor && `${getDoctor.firstName} ${getDoctor.lastName}`;

        const defaultMessage = `Xin chào!
            Tôi là bác sĩ ${doctorName}
        `
        const createConversation = await this.conversationService.createConversation(body)

        const sendMessage = await this.messageService.createMessage(getDoctor, { body: defaultMessage, conversation: createConversation[0] })

        const doctorSendNotify = `${doctorName} xác nhận đặt lịch`

        this.server.emit("notify_approved", { data: doctorSendNotify })
    }

    @SubscribeMessage('create_message')
    successBooking(client: Socket, payload: payloadBooking): void {
        this.server.emit('msgToClient', payload);
    }

    @SubscribeMessage("received_message")
    handleMessage(client: Socket, payload: unknown) {

        this.server.emit("send_message", payload)
    }
}

interface payloadBooking {
    userId: number,
    clientId: string
}