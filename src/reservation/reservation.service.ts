import { Injectable } from '@nestjs/common';
import path from 'path';
import { ExcelService } from '../excel/excel.service';
import { IReservation } from '../interfaces/reservation.interface';

@Injectable()
export class ReservationService {
  private readonly reservationSourcePath: string;

  public constructor(private readonly excelService: ExcelService) {
    this.reservationSourcePath = path.resolve(
      __dirname,
      '../../src/data/Reservations.csv',
    );
  }

  public async getReservations(): Promise<IReservation[]> {
    const reservations = await this.excelService.readFileWithStream(
      this.reservationSourcePath,
    );

    return reservations.map((row) => ({
      id: +this.excelService.getCellValue(row, 1),
      amenity_id: +this.excelService.getCellValue(row, 2),
      user_id: +this.excelService.getCellValue(row, 3),
      start_time: +this.excelService.getCellValue(row, 4),
      end_time: +this.excelService.getCellValue(row, 5),
      date: +this.excelService.getCellValue(row, 6).replace(/,/g, '.'),
    }));
  }
}
