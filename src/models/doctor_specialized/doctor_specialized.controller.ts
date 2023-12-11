import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorSpecializedService } from './doctor_specialized.service';
import { CreateDoctorSpecializedDto } from './dto/create-doctor_specialized.dto';
import { UpdateDoctorSpecializedDto } from './dto/update-doctor_specialized.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('doctor-specialized')
@ApiTags("doctor-specialized")
export class DoctorSpecializedController {
  constructor(private readonly doctorSpecializedService: DoctorSpecializedService) { }

  @Post("/create")
  create(@Body() body: CreateDoctorSpecializedDto[]) {
    this.doctorSpecializedService.create(body)
  }

}
