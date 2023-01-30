import { Test } from '@nestjs/testing';
import { ExcelService } from '../excel/excel.service';
import { ReservationService } from '../reservation/reservation.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ReservationService, ExcelService],
      controllers: [UserController],
    }).compile();

    reservationService = moduleRef.get<ReservationService>(ReservationService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('getReservations', () => {
    it('should return reservations by user', async () => {
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
      const mockedReservationsByUser = { '20.05.2020': mockedReservations };

      jest
        .spyOn(reservationService, 'getReservations')
        .mockImplementation(async () => mockedReservations);

      expect(
        await userController.getReservations(mockedReservations[0].user_id),
      ).toStrictEqual(mockedReservationsByUser);
    });
  });
});
