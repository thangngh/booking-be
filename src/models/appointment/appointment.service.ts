import { Injectable } from '@nestjs/common';
import { IBody } from 'common/constants/setting';
import { User } from 'models/user/entities/user.entity';
import Appointment from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { createAppointmentDTO } from './dto/create_appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>
    ) { }

    async createAppointment(user: User, body: createAppointmentDTO) {
        const { id } = user;

        return await this.appointmentRepository.save({
            ...body,
            status: "Scheduled",
            patientId: id
        })
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
            .where("patient.id = :id", { id: user.id })
            .getMany()

        return query
    }

    async getAppointmentByDoctor(user: User) {
        const query = await this.appointmentRepository.createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .where("doctor.id = :id", { id: user.id })
            .getMany()

        return query
    }

    async changeStatus(user: User, status: IBody) {
        const { value } = status;
        const query = await this.appointmentRepository.createQueryBuilder()
            .update(Appointment)
            .set({
                status: value
            })
            .where("doctor.id = :id", { id: user.id })
            .execute()

        console.log("query", query)
    }
}
