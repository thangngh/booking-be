import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';
import CreateMessageDto from './dto/create-message.dto';
import { Conversation } from 'models/conversation/entities/conversation.entity';
import { ConversationService } from 'models/conversation/conversation.service';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        private readonly conversationService: ConversationService
    ) { }

    // async receiveMessage(){}

    async createMessage(sender: User, data: CreateMessageDto) {
        const { body, conversation } = data;

        const getConversation = await this.conversationService.getConversationByName(conversation.name)

        const messageEntity = await this.messageRepository.create({
            body,
            conversation: getConversation,
            sender: sender[0]
        });

        await this.messageRepository.save(messageEntity);

        return messageEntity;
    }


    async getConversation(name: string) {
        const query = await this.messageRepository.createQueryBuilder("message")
            .leftJoinAndSelect("message.sender", "sender")
            .leftJoinAndSelect("message.seen", "seen")
            .leftJoinAndSelect("message.conversation", "conversation")
            .leftJoinAndSelect("conversation.user", "user")
            .select([
                'message.id',
                'message.body',
                'message.createAt',
                'message.sender',
                'sender.id',
                'sender.firstName',
                'sender.lastName',
                'sender.avatar',
                'seen.id',
                'seen.firstName',
                'seen.lastName',
                'seen.avatar',
                'conversation.id',
                'conversation.name',
                'conversation.userId',
                'user.id',
                'user.firstName',
                'user.lastName'
            ])
            .where("conversation.name = :name", { name })
            .orderBy("message.createAt", "ASC")
            .getMany()


        const message = query.map((mes) => ({
            id: mes.id,
            content: mes.body,
            createAt: mes.createAt,
            sender: {
                id: mes.sender.id,
                name: `${mes.sender.firstName} ${mes.sender.lastName}`,
                avatar: mes.sender.avatar
            },
            // seen: mes.seen.map((seen) => ({
            //     id: seen.id,
            //     name: `${seen.firstName} ${seen.lastName}`,
            //     avatar: seen.avatar
            // }))
        }))

        const conversation = query
            .filter((message) => message.conversation.name === name)
            .map((message) => ({
                conversationName: message.conversation.name,
                participant: message.conversation.user,
            }))
            .reduce((acc, current) => {
                const existingConversation = acc.find(
                    (conv) => conv.conversationName === current.conversationName
                );

                if (existingConversation) {
                    // Check if participant ID is not already in the set
                    if (!existingConversation.participantIds.has(current.participant.id)) {
                        existingConversation.participantIds.add(current.participant.id);
                        existingConversation.participants.push(current.participant);
                    }
                } else {
                    // Initialize a Set to keep track of unique participant IDs
                    const participantIds = new Set([current.participant.id]);
                    acc.push({
                        conversationName: current.conversationName,
                        participants: [current.participant],
                        participantIds,
                        message: message
                    });
                }

                return acc;
            }, []);

        // Remove participantIds property from the final result
        const uniqueConversation = conversation.map(({ participantIds, ...rest }) => rest);

        return uniqueConversation;
    }

}
