import { Controller, UseGuards, Body, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { createAppointmentDTO } from './dto/create_appointment.dto';
import { User } from 'models/user/entities/user.entity';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { IBody } from 'common/constants/setting';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @UseGuards(JwtGuard)
  @Put("/change-status")
  changeStatus(@ReqUser() user: User, @Body() status: IBody) {
    return this.appointmentService.changeStatus(user, status)
  }
}
