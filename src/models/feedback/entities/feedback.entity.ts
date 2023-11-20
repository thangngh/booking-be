import { BaseRepository } from "models/models.repository";
import { User } from "models/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback extends BaseRepository {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: number;

    @Column()
    content: string;

    @Column({ name: 'doctor_id' })
    doctorId: number;

    @Column({ name: 'patient_id' })
    patientId: number;

    @ManyToOne(() => User, doctor => doctor.feedbackDoctor)
    @JoinColumn({ name: 'doctor_id' })
    doctor: User

    @ManyToOne(() => User, patient => patient.feedbackPatient)
    @JoinColumn({ name: 'patient_id' })
    patient: User
}
