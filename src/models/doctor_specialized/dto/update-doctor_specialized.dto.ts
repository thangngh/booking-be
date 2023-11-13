import { PartialType } from '@nestjs/swagger';
import { CreateDoctorSpecializedDto } from './create-doctor_specialized.dto';

export class UpdateDoctorSpecializedDto extends PartialType(CreateDoctorSpecializedDto) {}
