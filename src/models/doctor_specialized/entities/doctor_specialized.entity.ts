import { Specialized } from "models/specialized/entities/specialized.entity";
import { User } from "models/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DoctorSpecialized {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'specialized_id' })
    specializedId: number;

    @Column()
    exp: string

    @ManyToOne(() => User, user => user.doctorSpecialized)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Specialized, specialized => specialized.doctorSpecialized)
    @JoinColumn({ name: 'specialized_id' })
    specialized: Specialized
}
