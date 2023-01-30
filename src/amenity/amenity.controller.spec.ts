import { Test } from '@nestjs/testing';
import { ExcelService } from '../excel/excel.service';
import { ReservationService } from '../reservation/reservation.service';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';

describe('AmenityController', () => {
  let amenityController: AmenityController;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AmenityService, ReservationService, ExcelService],
      controllers: [AmenityController],
    }).compile();

    reservationService = moduleRef.get<ReservationService>(ReservationService);
    amenityController = moduleRef.get<AmenityController>(AmenityController);
  });

  describe('getReservations', () => {
    it('should return reservations by amenity', async () => {
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
      const mockedReservationsByUser = [
        {
          amenity_id: 1,
          amenity_name: 'Mitel Networks Corporation',
          duration: 300,
          start_time: '10:00',
          user_id: 97,
        },
      ];

      jest
        .spyOn(reservationService, 'getReservations')
        .mockImplementation(async () => mockedReservations);

      expect(
        await amenityController.getReservations(
          mockedReservations[0].amenity_id,
          {
            date: mockedReservations[0].date,
          },
        ),
      ).toStrictEqual(mockedReservationsByUser);
    });
  });
});
