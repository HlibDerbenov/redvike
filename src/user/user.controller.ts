import { Controller, Get, Param } from '@nestjs/common';
import _ from 'lodash';
import { ReservationService } from '../reservation/reservation.service';
import { addLeadingZero } from '../util/utils';

@Controller('user')
export class UserController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':user_id/reservation')
  public async getReservations(@Param('user_id') user_id: number) {
    const reservations = await this.reservationService.getReservations();

    return _.groupBy(
      reservations.filter((reservation) => reservation.user_id === user_id),
      (reservation) => {
        const date = new Date(reservation.date);

        return `${addLeadingZero(String(date.getDate()), 2)}.${addLeadingZero(
          String(date.getMonth()),
          2,
        )}.${date.getFullYear()}`;
      },
    ); /* { 20.05.2020: [...list of reservations] } */
  }
}
