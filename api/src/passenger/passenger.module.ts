import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Passenger } from './entities/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger]), DriverModule],
  controllers: [PassengerController],
  providers: [PassengerService],  
  exports: [PassengerService]
})
export class PassengerModule {}
