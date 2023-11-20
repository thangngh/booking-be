import { Message } from "models/message/entities/message.entity";
import { User } from "models/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: () => "CURRENT_TIMESTAMP"
    })
    createAt: Date;

    @Column()
    name: string;

    @Column({ name: 'user_id' })
    userId: number;

    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[];

    @ManyToOne(() => User, (user) => user.conversations)
    @JoinColumn({ name: 'user_id' })
    user: User;
}