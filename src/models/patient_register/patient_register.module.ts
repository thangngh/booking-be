import { Module } from '@nestjs/common';
import { PatientRegisterService } from './patient_register.service';
import { PatientRegisterController } from './patient_register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRegister } from './entities/patient_register.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientRegister])
  ],
  controllers: [PatientRegisterController],
  providers: [PatientRegisterService]
})
export class PatientRegisterModule { }
