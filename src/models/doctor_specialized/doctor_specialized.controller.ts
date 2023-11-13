import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorSpecializedService } from './doctor_specialized.service';
import { CreateDoctorSpecializedDto } from './dto/create-doctor_specialized.dto';
import { UpdateDoctorSpecializedDto } from './dto/update-doctor_specialized.dto';

@Controller('doctor-specialized')
export class DoctorSpecializedController {
  constructor(private readonly doctorSpecializedService: DoctorSpecializedService) { }


}
