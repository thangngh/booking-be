import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  limit?: number;

  //   @ApiProperty()
  // @IsOptional()
  // ingredient?: string;

  // @IsOptional()
  // name?: string;
}