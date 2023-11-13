import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {

	@IsString()
	@ApiProperty()
	username: string;

	@IsString()
	@ApiProperty()
	firstName: string;

	@IsString()
	@ApiProperty()
	lastName: string;

	@IsString()
	@ApiProperty()
	password: string;

	@IsEmail()
	@ApiProperty()
	@IsNotEmpty()
	email: string;
}