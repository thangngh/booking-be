import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/entities/user.entity';
import { Role } from 'models/role/entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleModule } from 'models/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
    RoleModule
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService]
})
export class UserRoleModule { }
