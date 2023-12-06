import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingHistoryDto {

    @ApiProperty()
    appointmentId: number

    @ApiProperty()
    status: string;
}