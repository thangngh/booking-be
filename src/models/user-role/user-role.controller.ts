import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { User } from 'models/user/entities/user.entity';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { RoleType } from 'common/constants/setting';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-role')
@ApiTags("user-role")
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }


  @UseGuards(JwtGuard)
  @Get("/get-user-role")
  listRoleUser(@ReqUser() user: User) {
    return this.userRoleService.listRoleUser(user)
  }

}
