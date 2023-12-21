import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import { IBody } from 'common/constants/setting';
import { ApiTags } from '@nestjs/swagger';
import { createAppointmentDTO } from './dto/create_appointment.dto';

@Controller('appointment')
@ApiTags("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  // @UseGuards(JwtGuard)
  // @Put("/change-status")
  // changeStatus(@ReqUser() user: User, @Body() status: IBody) {
  //   return this.appointmentService.changeStatus(user, status)
  // }

  @UseGuards(JwtGuard)
  @Post("/create")
  createAppointment(@ReqUser() user: User, @Body() body: createAppointmentDTO) {
    return this.appointmentService.createAppointment(user, body)
  }

  @UseGuards(JwtGuard)
  @Get("/get-by-doctor")
  getAppointmentByDoctor(@ReqUser() user: User) {
    return this.appointmentService.getAppointmentByDoctor(user)
  }


  @UseGuards(JwtGuard)
  @Get("/get-by-patient")
  getAppointmentByPatient(@ReqUser() user: User) {
    return this.appointmentService.getAppointmentByPatient(user)
  }


  @UseGuards(JwtGuard)
  @Get("/get-one/:id")
  getOne(@ReqUser() user: User, @Param("id") id: string) {
    return this.appointmentService.getOne(+id)
  }

}

