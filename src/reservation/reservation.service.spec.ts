import { Test, TestingModule } from '@nestjs/testing';
import { ExcelService } from '../excel/excel.service';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let reservationService: ReservationService;

  const mockedReservations = [
    {
      id: 1,
      amenity_id: 1,
      user_id: 97,
      start_time: 600,
      end_time: 900,
      date: 1592611200000,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService, ExcelService],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('should return reservations', async () => {
    jest
      .spyOn(reservationService, 'getReservations')
      .mockImplementation(async () => mockedReservations);

    expect(await reservationService.getReservations()).toStrictEqual(
      mockedReservations,
    );
  });
});
