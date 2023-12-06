import { Controller, Param, Get, Query, UseGuards, Body, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { createConversationDto } from './dto/create-conversation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('conversation')
@ApiTags("conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }


  @UseGuards(JwtGuard)
  @Get("/get-all")
  getAllConversation(
    @ReqUser() user: User
  ) {
    return this.conversationService.getAllConversation(user);
  }

  @Post("/create-conversation")
  createConversation(@Body() body: createConversationDto[]) {
    return this.conversationService.createConversation(body)
  }

  // @Get("/get-one/conversation/:id")
  // getOneConversation(@Param('id') id: number) {
  //   return this.conversationService.getOneConversation(id)
  // }
}
