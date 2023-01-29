import { Module } from '@nestjs/common';
import { AmenityModule } from './amenity/amenity.module';
import { ExcelModule } from './excel/excel.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [AmenityModule, ReservationModule, ExcelModule],
})
export class AppModule {}
