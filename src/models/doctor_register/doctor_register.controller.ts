import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorRegisterService } from './doctor_register.service';
import { CreateDoctorRegisterDto } from './dto/create-doctor_register.dto';
import { UpdateDoctorRegisterDto } from './dto/update-doctor_register.dto';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('doctor-register')
@ApiTags("doctor-register")
export class DoctorRegisterController {
  constructor(private readonly doctorRegisterService: DoctorRegisterService) { }


  @UseGuards(JwtGuard)
  @Post("/create")
  registerDoctor(@ReqUser() user: User, @Body() body: CreateDoctorRegisterDto) {
    return this.doctorRegisterService.registerDoctor(user, body)
  }

  @UseGuards(JwtGuard)
  @Patch("/edit/:doctorId")
  editDoctor(@Param('doctorId') doctorId: number, @ReqUser() user: User, @Body() body: CreateDoctorRegisterDto) {
    return this.doctorRegisterService.editDoctor(doctorId, user, body)
  }
}
