import { User } from "models/user/entities/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fromDate: Date;

    @Column()
    toDate: Date;

    @Column({ name: 'doctor_id' })
    doctorId: number;

    @Column({ name: 'patient_id' })
    patientId: number;
}
//  Status (Scheduled/Completed/Cancelled)