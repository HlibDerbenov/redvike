import { ApiProperty } from '@nestjs/swagger';
import { IReservation } from '../interfaces/reservation.interface';

export class ReservationDto implements IReservation {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  amenity_id: number;

  @ApiProperty({ example: 4 })
  user_id: number;

  @ApiProperty({ example: 600 })
  start_time: number;

  @ApiProperty({ example: 900 })
  end_time: number;

  @ApiProperty({ example: 1592611200000 })
  date: number;
}
