import { IsNotEmpty, IsOptional } from "class-validator";
import { EGender, IAddress } from "common/constants/setting";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    address: IAddress;

    @IsOptional()
    gender: EGender;
}


export class UploadAvatar {
    @IsNotEmpty()
    avatar: string;
}