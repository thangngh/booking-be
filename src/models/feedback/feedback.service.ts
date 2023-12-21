import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>
  ) { }

  async createFeedBack(user: User, body: CreateFeedbackDto) {
    const query = await this.feedbackRepository.createQueryBuilder()
      .insert()
      .into(Feedback)
      .values({
        ...body,
        patientId: user.id,
        createdAt: new Date,
        isActive: true
      })
      .execute()

    const insertedFeedbackId = query.identifiers[0].id;

    const returnedFeedback = await this.feedbackRepository.createQueryBuilder("feedback")
      .select()
      .where('feedback.id = :id', { id: insertedFeedbackId })
      .getOne();

    return returnedFeedback;

  }

  async getFeedBack(doctorId: number) {
    const query = await this.feedbackRepository.createQueryBuilder("feedback")
      .leftJoinAndSelect("feedback.doctor", "doctor")
      .where("doctor.id = :id", { id: doctorId })
      .getMany()

    return query;
  }
}
