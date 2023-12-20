import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorSpecializedService } from './doctor_specialized.service';
import { CreateDoctorSpecializedDto } from './dto/create-doctor_specialized.dto';
import { UpdateDoctorSpecializedDto } from './dto/update-doctor_specialized.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { User } from 'models/user/entities/user.entity';
import { ReqUser } from 'common/decorators/rep-user.decorator';

@Controller('doctor-specialized')
@ApiTags("doctor-specialized")
export class DoctorSpecializedController {
  constructor(private readonly doctorSpecializedService: DoctorSpecializedService) { }

  @UseGuards(JwtGuard)
  @Post("/create")
  create(@ReqUser() user: User, @Body() body: CreateDoctorSpecializedDto[]) {
    this.doctorSpecializedService.create(user, body)
  }

}
