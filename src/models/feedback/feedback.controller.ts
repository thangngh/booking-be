import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('feedback')
@ApiTags("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post("/create-feedback")
  createFeedBack(@Body() body: CreateFeedbackDto) {
    return this.feedbackService.createFeedBack(body)
  }
}
