import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, UploadAvatar } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }


export class UpdateAvatarDto extends PartialType(UploadAvatar) { }