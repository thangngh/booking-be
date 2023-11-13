import { Module } from '@nestjs/common';
import { DoctorSpecializedService } from './doctor_specialized.service';
import { DoctorSpecializedController } from './doctor_specialized.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSpecialized } from './entities/doctor_specialized.entity';
import { Specialized } from 'models/specialized/entities/specialized.entity';
import { User } from 'models/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorSpecialized, Specialized, User])
  ],
  controllers: [DoctorSpecializedController],
  providers: [DoctorSpecializedService]
})
export class DoctorSpecializedModule { }
