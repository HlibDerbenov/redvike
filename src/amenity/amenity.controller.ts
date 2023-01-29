import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _ from 'lodash';
import { GetAmenitiesOutputDto } from '../dto/get-amenities-output.dto';
import { GetAmenitiesParamsDto } from '../dto/get-amenities-params.dto';
import { ReservationService } from '../reservation/reservation.service';
import { isTheSameDay, toHoursAndMinutes } from '../util/utils';
import { AmenityService } from './amenity.service';

@Controller('amenity')
export class AmenityController {
  constructor(
    private readonly amenityService: AmenityService,
    private readonly reservationService: ReservationService,
  ) {}

  @Get(':id/reservation')
  @ApiOkResponse({
    type: [GetAmenitiesOutputDto],
  })
  public async getReservations(
    @Param('id') amenity_id: number,
    @Query() params: GetAmenitiesParamsDto,
  ): Promise<GetAmenitiesOutputDto[]> {
    const reservations = await this.reservationService.getReservations();
    const amenity = await this.amenityService.findOne(amenity_id);

    return reservations
      .sort((a, b) => a.start_time - b.start_time)
      .reduce((accumulator, current) => {
        if (
          current.amenity_id === amenity_id &&
          isTheSameDay(current.date, params.date)
        ) {
          accumulator.push({
            ..._.pick(current, ['amenity_id', 'user_id']),
            start_time: toHoursAndMinutes(current.start_time),
            duration: current.end_time - current.start_time,
            amenity_name: amenity.name,
          });
        }

        return accumulator;
      }, []);
  }
}
