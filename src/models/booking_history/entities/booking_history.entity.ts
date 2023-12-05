import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class BookingHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'appointment_id' })
    appointmentId: number

    @Column()
    status: string;
}
//  Status (Confirmed/Cancelled)