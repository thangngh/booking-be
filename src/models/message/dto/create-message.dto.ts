import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Conversation } from "models/conversation/entities/conversation.entity";
import { User } from "models/user/entities/user.entity";

export default class CreateMessageDto {

    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    conversation: Conversation;

    // @IsOptional()
    // @IsArray()
    // seenBy: User[];
}