import { BadRequestException, Injectable } from '@nestjs/common';
import { IBody, generateString } from 'common/constants/setting';
import { User } from 'models/user/entities/user.entity';
import Appointment from './entities/appointment.entity';
import { Not, Repository } from 'typeorm';
import { createAppointmentDTO } from './dto/create_appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingHistoryService } from 'models/booking_history/booking_history.service';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
        private readonly bookingHistoryService: BookingHistoryService
    ) { }

    async createAppointment(user: User, body: createAppointmentDTO) {
        const { id } = user;
        const generaleClient = generateString()
        if ((await this.findPatient(id)).length > 0) {
            throw new BadRequestException("Trùng")
        }

        return await this.appointmentRepository.save({
            ...body,
            status: "Scheduled",
            clientId: generaleClient,
            patientId: id
        })
    }

    async findPatient(id) {
        const query = await this.appointmentRepository.find({
            where: {
                patientId: id,
                status: "Scheduled"
            }
        })
        return query;
    }

    async getOne(id: number) {
        const query = await this.appointmentRepository.findOne({
            where: { id }
        })

        return query;
    }

    async getAppointmentByPatient(user: User) {
        const query = await this.appointmentRepository.createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.patient", "patient")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .where("patient.id = :id", { id: user.id })
            .getMany()

        return query
    }

    async getAppointmentByDoctor(user: User) {
        const query = await this.appointmentRepository.createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("doctor.id = :id", { id: user.id })
            .getMany()

        return query
    }

    async changeStatus(doctor: string, appointmentId: string, value: IBody) {

        const { status } = value;
        const query = await this.appointmentRepository.createQueryBuilder()
            .update(Appointment)
            .set({
                status: status
            })
            .where("doctorId = :doctorId", { doctorId: doctor })
            .andWhere("id = :appointmentId", { appointmentId: appointmentId })
            .execute();

        const result = query && await this.getOne(+appointmentId)
        this.bookingHistoryService.createBookingHistory({ appointmentId: +appointmentId, status })
        return result
    }
}