import { ApiProperty } from '@nestjs/swagger';
import { IReservation } from '../interfaces/reservation.interface';

export class Reservation implements IReservation {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 1 })
  amenity_id: number;

  @ApiProperty({ example: 4 })
  user_id: number;

  @ApiProperty()
  start_time: number;

  @ApiProperty()
  end_time: number;

  @ApiProperty()
  date: number;
}
