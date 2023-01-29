import { ApiProperty, PickType } from '@nestjs/swagger';
import { Reservation } from './reservation.dto';

export class GetAmenitiesOutputDto extends PickType(Reservation, [
  'amenity_id',
  'user_id',
]) {
  @ApiProperty({ example: '09:00' })
  start_time: string;

  @ApiProperty({ example: 480 })
  duration: number;

  @ApiProperty({ example: 'Mitel Networks Corporation' })
  amenity_name: string;
}
