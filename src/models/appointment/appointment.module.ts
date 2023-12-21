import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from './entities/appointment.entity';
import { User } from 'models/user/entities/user.entity';
import BookingHistory from 'models/booking_history/entities/booking_history.entity';
import { BookingHistoryModule } from 'models/booking_history/booking_history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, BookingHistory]),
    BookingHistoryModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService
  ]
})
export class AppointmentModule { }
