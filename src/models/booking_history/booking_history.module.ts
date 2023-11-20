import { Module } from '@nestjs/common';
import { BookingHistoryService } from './booking_history.service';
import { BookingHistoryController } from './booking_history.controller';

@Module({
  controllers: [BookingHistoryController],
  providers: [BookingHistoryService]
})
export class BookingHistoryModule {}
