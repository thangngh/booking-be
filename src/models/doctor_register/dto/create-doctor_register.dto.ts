import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateDoctorRegisterDto {

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    certification: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    // @IsNotEmpty()
    timeBegin: Date;

    @ApiProperty()
    // @IsNotEmpty()
    timeEnd: Date
}
