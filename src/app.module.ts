import { Module } from '@nestjs/common';
import { AmenityModule } from './amenity/amenity.module';
import { ExcelModule } from './excel/excel.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AmenityModule, ReservationModule, ExcelModule, UserModule],
})
export class AppModule {}
