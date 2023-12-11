import BookingHistory from "models/booking_history/entities/booking_history.entity";
import { User } from "models/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    fromDate: Date;

    @Column({ nullable: true })
    toDate: Date;

    @Column({ name: 'doctor_id' })
    doctorId: number;

    @Column({ name: 'patient_id' })
    patientId: number;

    @Column()
    status: string;

    @Column()
    clientId: string;

    @ManyToOne(() => User, doctor => doctor.appointmentDoctor)
    @JoinColumn({ name: "doctor_id" })
    doctor: User

    @ManyToOne(() => User, patient => patient.appointmentPatient)
    @JoinColumn({ name: "patient_id" })
    patient: User

    @OneToMany(() => BookingHistory, bookingHistory => bookingHistory.appointment)
    bookingHistory: BookingHistory[]
}
//  Status (Scheduled/Completed/Cancelled)