import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientRegisterService } from './patient_register.service';
import { CreatePatientRegisterDto } from './dto/create-patient_register.dto';
import { UpdatePatientRegisterDto } from './dto/update-patient_register.dto';

@Controller('patient-register')
export class PatientRegisterController {
  constructor(private readonly patientRegisterService: PatientRegisterService) { }


}
