import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorSpecializedDto {

    // @ApiProperty()
    // userId: number

    @ApiProperty()
    specializedId: number

    @ApiProperty()
    exp: string;
}
