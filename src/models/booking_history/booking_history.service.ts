import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BookingHistory from './entities/booking_history.entity';
import { CreateBookingHistoryDto } from './dto/Create.booking_history.dto';
import { User } from 'models/user/entities/user.entity';
@Injectable()
export class BookingHistoryService {
    constructor(
        @InjectRepository(BookingHistory) private readonly bookingHistoryRepository: Repository<BookingHistory>
    ) { }

    async createBookingHistory(body: CreateBookingHistoryDto) {
        return await this.bookingHistoryRepository.save(body)
    }

    async getBookingHistoryByDoctor(user: User) {
        const query = await this.bookingHistoryRepository.createQueryBuilder("booking")
            .leftJoinAndSelect("booking.appointment", "appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .where("doctor.id = :id", { id: user.id })
            .getMany()

        return query;
    }
}
