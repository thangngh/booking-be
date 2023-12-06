import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientRegisterDto {

    @ApiProperty()
    symptom: string;

    @ApiProperty()
    insurance: string
}