import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import CreateMessageDto from './dto/create-message.dto';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('message')
@ApiTags("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) { }


  @Get("/get-conversation")
  async getConversation(@Query('id') id: string) {
    return this.messageService.getConversation(id)
  }

  @UseGuards(JwtGuard)
  @Post("/create-message")
  async createMessage(@ReqUser() user: User, @Body() data: CreateMessageDto) {
    return this.messageService.createMessage(user, data)
  }
}
