import { Controller } from '@nestjs/common';
import { BookingHistoryService } from './booking_history.service';

@Controller('booking-history')
export class BookingHistoryController {
  constructor(private readonly bookingHistoryService: BookingHistoryService) {}
}
