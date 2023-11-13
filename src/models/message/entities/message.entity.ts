import { Conversation } from "models/conversation/entities/conversation.entity";
import { User } from "models/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column({
        default: () => "CURRENT_TIMESTAMP"
    })
    createAt: Date

    @ManyToMany(() => User, (user) => user.seenMessages)
    @JoinTable()
    seen: User[];

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation;

    @ManyToOne(() => User, (user) => user.messages)
    sender: User; r

}