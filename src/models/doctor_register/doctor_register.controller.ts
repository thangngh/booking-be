import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorRegisterService } from './doctor_register.service';
import { CreateDoctorRegisterDto } from './dto/create-doctor_register.dto';
import { UpdateDoctorRegisterDto } from './dto/update-doctor_register.dto';

@Controller('doctor-register')
export class DoctorRegisterController {
  constructor(private readonly doctorRegisterService: DoctorRegisterService) { }

}
