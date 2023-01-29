import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';

@Module({
  providers: [AmenityService],
  exports: [AmenityService],
})
export class AmenityModule {}
