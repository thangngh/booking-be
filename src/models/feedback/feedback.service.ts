import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>
  ) { }

  async createFeedBack(body: CreateFeedbackDto) {
    const query = await this.feedbackRepository.createQueryBuilder()
      .insert()
      .into(Feedback)
      .values({
        ...body,
        isActive: true
      })
      .execute()

    const insertedFeedbackId = query.identifiers[0].id;

    const returnedFeedback = await this.feedbackRepository.createQueryBuilder()
      .select()
      .from(Feedback, 'feedback')
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
