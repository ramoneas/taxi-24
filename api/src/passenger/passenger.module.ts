import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService]
})
export class PassengerModule {}
