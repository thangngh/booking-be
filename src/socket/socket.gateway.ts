import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { AppointmentService } from 'models/appointment/appointment.service';
import { ConversationService } from 'models/conversation/conversation.service';
import { MessageService } from 'models/message/message.service';
import { UserService } from 'models/user/user.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'], cors: { origin: "*" } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server!: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(
        private readonly conversationService: ConversationService,
        private readonly messageService: MessageService,
        private readonly userService: UserService,
        private readonly appointmentService: AppointmentService
    ) { }

    getServer() {
        return this.server;
    }

    handleConnection(client: any) {
        this.logger.verbose(`Client Connected ...!: ${client.id}`)
    }

    handleDisconnect(client: any) {
        this.logger.verbose("Client Disconnected ...!")
    }

    @SubscribeMessage("approved_booking")
    async notifyBooking(client: Socket, payload: any) {

        const { doctor_Id, appointmentId, patient_id } = payload

        const body = [doctor_Id, patient_id].map((value) => ({ userId: value }))

        const conversation = await this.conversationService.findParticipantConversation(body)

        if (conversation.length === body.length) return;

        const getDoctor = await this.userService.findUserById(doctor_Id)

        const approvedAppointment = await this.appointmentService.changeStatus(doctor_Id, appointmentId, { status: "Completed" })

        const doctorName = ` ${getDoctor[0].firstName} ${getDoctor[0].lastName} `

        const defaultMessage = `Xin chào!
        Tôi là bác sĩ ${doctorName}
        `
        const createConversation = await this.conversationService.createConversation(body)

        const sendMessage = await this.messageService.createMessage(getDoctor, { body: defaultMessage, conversation: createConversation[0] })

        const doctorSendNotify = `${doctorName} xác nhận đặt lịch`

        this.server.emit("notify_approved", { data: doctorSendNotify })
    }

    @SubscribeMessage("reject_booking")
    async rejectBooking(client: Socket, payload: any) {

        const { doctor_Id, appointmentId, patient_id, patient_client_id } = payload


        const getDoctor = await this.userService.findUserById(doctor_Id)

        const approvedAppointment = await this.appointmentService.changeStatus(doctor_Id, appointmentId, { status: "Cancelled" })

        const doctorName = ` ${getDoctor[0].firstName} ${getDoctor[0].lastName} `

        const doctorSendNotify = `Bác sỹ ${doctorName} từ chối đặt lịch`

        this.server.emit("notify_reject", doctorSendNotify)
    }

    @SubscribeMessage("send_message")
    async handleMessage(client: Socket, payload: any) {
        console.log("payload", payload)
        const { sender, receiver, conversation, content } = payload

        const getSender = await this.userService.findUserById(sender)
        const getConversation = await this.conversationService.getConversationByName(conversation)

        const body = [sender, receiver].map((value) => ({ userId: value }))

        if (!content) this.server.emit("send_message_error", "Required message!")

        const findParticipant = await this.conversationService.findParticipantConversation(body)
        const sendMessage = await this.messageService.createMessage(getSender, { body: content, conversation: getConversation })

        this.server.emit("received_message", sendMessage)
    }
}

