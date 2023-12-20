import { Injectable } from '@nestjs/common';
import { CreateDoctorSpecializedDto } from './dto/create-doctor_specialized.dto';
import { UpdateDoctorSpecializedDto } from './dto/update-doctor_specialized.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorSpecialized } from './entities/doctor_specialized.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';

@Injectable()
export class DoctorSpecializedService {
    constructor(
        @InjectRepository(DoctorSpecialized) private readonly doctorSpecializedRepository: Repository<DoctorSpecialized>
    ) { }


    async create(user: User, body: CreateDoctorSpecializedDto[]) {
        const entities = body.map((data) => this.doctorSpecializedRepository.create({
            ...data,
            userId: user.id
        }))

        return await this.doctorSpecializedRepository.save(entities)
    }
}
