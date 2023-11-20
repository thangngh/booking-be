import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorRegisterDto } from './dto/create-doctor_register.dto';
import { UpdateDoctorRegisterDto } from './dto/update-doctor_register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRegister } from './entities/doctor_register.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorRegisterService {
    constructor(
        @InjectRepository(DoctorRegister) private readonly doctorRepository: Repository<DoctorRegister>,
    ) { }

    async registerDoctor(user: User, body: CreateDoctorRegisterDto) {
        const { id } = user;
        const transition = await this.doctorRepository.manager.connection.createQueryRunner();

        await transition.connect();
        await transition.startTransaction();

        try {
            const created = await transition.manager.create(DoctorRegister, {
                phone: body.phone, certification: body.certification, email: body.email, timeBegin: body.timeBegin, timeEnd: body.timeEnd, userId: id
            })

            const save = await transition.manager.save(created)
            console.log("created", save)
            await transition.commitTransaction()
        } catch (error) {
            await transition.rollbackTransaction();


            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } finally {
            await transition.release();
        }

    }

    async editDoctor(doctorId: number, user: User, body: UpdateDoctorRegisterDto) {

        const updateDoctor = await this.doctorRepository.createQueryBuilder()
            .update(DoctorRegister)
            .set({
                ...body
            })
            .where("id = :id", { id: doctorId })
            .execute()

    }

    // async activeDoctor(user: User) { }
}
