import { ApiProperty } from '@nestjs/swagger';
import { IAmenity } from '../interfaces/amenity.interface';

export class Amenity implements IAmenity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
