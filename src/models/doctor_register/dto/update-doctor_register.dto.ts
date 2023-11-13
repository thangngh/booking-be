import { PartialType } from '@nestjs/swagger';
import { CreateDoctorRegisterDto } from './create-doctor_register.dto';

export class UpdateDoctorRegisterDto extends PartialType(CreateDoctorRegisterDto) {}
