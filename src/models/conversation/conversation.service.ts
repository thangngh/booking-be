import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';
import { createConversationDto } from './dto/create-conversation.dto';
import { IBody, generateString } from 'common/constants/setting';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>
    ) { }

    async createConversation(body: createConversationDto[]) {
        const generaleConversationName = generateString()

        const created = body.map(({ userId }) =>
            this.conversationRepository.create({
                name: generaleConversationName,
                userId: userId,
                isActive: true
            })
        )

        return await this.conversationRepository.save(created)
    }

    async findParticipantConversation(user: IBody[]) {
        const result = [];
        for await (const { userId } of user) {
            const findData = await this.conversationRepository.findOne({
                where: {
                    userId: +userId,
                    isActive: true
                }
            })
            findData && result.push(findData)
        }

        return result;
    }

    async getAllConversation(user: User) {
        const { id } = user;

        const query = await this.conversationRepository.createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.user", "user")
            .groupBy("conversation.name")
            .having("FIND_IN_SET(:userId, GROUP_CONCAT(conversation.userId)) > 0", { userId: id })
            .select([
                "conversation.name as name",
                "GROUP_CONCAT(conversation.userId) as userIds"
            ])
            .getRawMany();

        const formattedResult = query.map(item => ({
            name: item.name,
            userIds: item.userIds.split(',').map(userId => parseInt(userId))
        }));

        return formattedResult;
    }

    async getConversationByName(name: string) {
        const query = await this.conversationRepository.createQueryBuilder("conversation")
            .where("conversation.name = :name", { name })
            // .andWhere("conversation.userId = :id", { id: sender })
            .andWhere("conversation.isActive = :status", { status: true })
            .getOne()

        return query;
    }
}
