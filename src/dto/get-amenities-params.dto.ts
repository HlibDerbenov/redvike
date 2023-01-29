import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetAmenitiesParamsDto {
  @ApiProperty({ example: 1592611200000, description: 'Timestamp' })
  @IsNumber()
  @Type(() => Number)
  date: number;
}
