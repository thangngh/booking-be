import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDTO } from 'common/pagination/dto/paginationQuery-dto';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get("/all-doctor")
  getAllDoctor(@Query() query: PaginationDTO) {
    return this.userService.getAllDoctor(query)
  }


  @UseGuards(JwtGuard)
  @Get("/user-role")
  getUserRole(@ReqUser() user: User) {
    return this.userService.getUserRole(user)
  }
}
