import { Injectable } from '@nestjs/common';
import { CreatePatientRegisterDto } from './dto/create-patient_register.dto';
import { UpdatePatientRegisterDto } from './dto/update-patient_register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRegister } from './entities/patient_register.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientRegisterService {
  constructor(
    @InjectRepository(PatientRegister) private readonly patientRegisterRepository: Repository<PatientRegister>
  ) { }
}
