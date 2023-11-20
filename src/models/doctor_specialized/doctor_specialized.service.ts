import { Injectable } from '@nestjs/common';
import { CreateDoctorSpecializedDto } from './dto/create-doctor_specialized.dto';
import { UpdateDoctorSpecializedDto } from './dto/update-doctor_specialized.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorSpecialized } from './entities/doctor_specialized.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorSpecializedService {
    constructor(
        @InjectRepository(DoctorSpecialized) private readonly doctorSpecializedRepository: Repository<DoctorSpecialized>
    ) { }


    async create(body: CreateDoctorSpecializedDto[]) {
        const entities = body.map((data) => this.doctorSpecializedRepository.create(data))

        return await this.doctorSpecializedRepository.save(entities)
    }
}
