import { Module } from '@nestjs/common';
import { BookingHistoryService } from './booking_history.service';
import { BookingHistoryController } from './booking_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BookingHistory from './entities/booking_history.entity';
import Appointment from 'models/appointment/entities/appointment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([BookingHistory, Appointment])
  ],
  controllers: [BookingHistoryController],
  providers: [BookingHistoryService]
})
export class BookingHistoryModule { }
