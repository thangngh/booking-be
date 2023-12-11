import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import { IBody } from 'common/constants/setting';
import { ApiTags } from '@nestjs/swagger';

@Controller('appointment')
@ApiTags("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }
}
