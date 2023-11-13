import { BaseRepository } from "models/models.repository";
import { User } from "models/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DoctorRegister extends BaseRepository {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    certification: string

    @Column({ nullable: true })
    email: string

    @Column({ name: 'time_begin', default: () => 'CURRENT_TIMESTAMP' })
    timeBegin: Date

    @Column({ name: 'time_end', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    timeEnd: Date;

    @Column({ name: 'user_id' })
    userId: number

    @ManyToOne(() => User, user => user.doctorRegister)
    @JoinColumn({ name: 'user_id' })
    user: User

}
