import { Module } from '@nestjs/common';
import { ExcelModule } from '../excel/excel.module';
import { ReservationModule } from '../reservation/reservation.module';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';

@Module({
  imports: [ExcelModule, ReservationModule],
  providers: [AmenityService],
  exports: [AmenityService],
  controllers: [AmenityController],
})
export class AmenityModule {}
