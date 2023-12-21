import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';

@Controller('feedback')
@ApiTags("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @UseGuards(JwtGuard)
  @Post("/create-feedback")
  createFeedBack(@ReqUser() user: User, @Body() body: CreateFeedbackDto) {
    return this.feedbackService.createFeedBack(user, body)
  }

  @Get("/get-feedback-doctor/:id")
  getFeedBack(@Param("id") id: number) {
    return this.feedbackService.getFeedBack(id)
  }
}
