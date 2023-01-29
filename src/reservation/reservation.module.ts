import { Module } from '@nestjs/common';
import { ExcelModule } from '../excel/excel.module';
import { ReservationService } from './reservation.service';

@Module({
  imports: [ExcelModule],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
