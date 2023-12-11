import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'models/user-role/entities/user-role.entity';
import { UserRepository } from './user.repository';
import { DoctorRegister } from 'models/doctor_register/entities/doctor_register.entity';
import { DoctorSpecialized } from 'models/doctor_specialized/entities/doctor_specialized.entity';
import { Conversation } from 'models/conversation/entities/conversation.entity';
import { Message } from 'models/message/entities/message.entity';
import { Feedback } from 'models/feedback/entities/feedback.entity';
import Appointment from 'models/appointment/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      DoctorRegister,
      DoctorSpecialized,
      Conversation,
      Message,
      Feedback,
      Appointment
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
