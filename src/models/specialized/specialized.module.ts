import { Module } from '@nestjs/common';
import { SpecializedService } from './specialized.service';
import { SpecializedController } from './specialized.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialized } from './entities/specialized.entity';
import { DoctorSpecialized } from 'models/doctor_specialized/entities/doctor_specialized.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialized, DoctorSpecialized])
  ],
  controllers: [SpecializedController],
  providers: [SpecializedService],
})
export class SpecializedModule { }
