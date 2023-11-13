import { PartialType } from '@nestjs/swagger';
import { CreateSpecializedDto } from './create-specialized.dto';

export class UpdateSpecializedDto extends PartialType(CreateSpecializedDto) {}
