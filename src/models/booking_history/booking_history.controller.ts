import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingHistoryService } from './booking_history.service';
import { CreateBookingHistoryDto } from './dto/Create.booking_history.dto';

@Controller('booking-history')
export class BookingHistoryController {
  constructor(private readonly bookingHistoryService: BookingHistoryService) { }

  @Post("/create-booking-history")
  createBookingHistory(@Body() body: CreateBookingHistoryDto) {
    return this.bookingHistoryService.createBookingHistory(body)
  }

}
