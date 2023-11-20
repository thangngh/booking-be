import { PartialType } from '@nestjs/swagger';
import { CreatePatientRegisterDto } from './create-patient_register.dto';

export class UpdatePatientRegisterDto extends PartialType(CreatePatientRegisterDto) {}
