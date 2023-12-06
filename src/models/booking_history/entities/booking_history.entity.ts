import Appointment from "models/appointment/entities/appointment.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export default class BookingHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'appointment_id' })
    appointmentId: number

    @Column()
    status: string;

    @ManyToOne(() => Appointment, appointment => appointment.bookingHistory)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment
}
//  Status (Confirmed/Cancelled)