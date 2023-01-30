import { Module } from '@nestjs/common';
import { ReservationModule } from '../reservation/reservation.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ReservationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
