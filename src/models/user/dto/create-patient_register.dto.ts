import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreatePatientRegisterDto {

    @ApiProperty()
    @IsOptional()
    symptom: string;

    @ApiProperty()
    @IsOptional()
    insurance: string
}
