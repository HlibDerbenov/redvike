import { Module } from '@nestjs/common';
import { ReservationModule } from '../reservation/reservation.module';
import { UserController } from './user.controller';

@Module({
  imports: [ReservationModule],
  controllers: [UserController],
})
export class UserModule {}
