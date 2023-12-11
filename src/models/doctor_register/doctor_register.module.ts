import { Module } from '@nestjs/common';
import { DoctorRegisterService } from './doctor_register.service';
import { DoctorRegisterController } from './doctor_register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/entities/user.entity';
import { DoctorRegister } from './entities/doctor_register.entity';
import { UserRoleModule } from 'models/user-role/user-role.module';
import { RoleModule } from 'models/role/role.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, DoctorRegister]),
    UserRoleModule,
    RoleModule
  ],
  controllers: [DoctorRegisterController],
  providers: [DoctorRegisterService]
})
export class DoctorRegisterModule { }
