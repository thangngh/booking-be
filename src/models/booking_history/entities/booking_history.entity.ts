import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class BookingHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'appointment_id' })
    appointmentId: number
}
//  Status (Confirmed/Cancelled)