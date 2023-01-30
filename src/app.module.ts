import { Module } from '@nestjs/common';
import { AmenityModule } from './amenity/amenity.module';
import { ExcelModule } from './excel/excel.module';
import { FileModule } from './file/file.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AmenityModule,
    ReservationModule,
    ExcelModule,
    UserModule,
    FileModule,
    AuthModule,
  ],
})
export class AppModule {}
