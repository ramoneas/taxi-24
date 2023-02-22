import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './entities/passenger.entity';

@Controller('api/passenger')
export class PassengerController {
  constructor(private passengerService: PassengerService) {}

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    return this.passengerService.create(createPassengerDto);
  }

  @Get()
  findAll(): Promise<Passenger[]> {
    return this.passengerService.findAll();
  }

  @Get('/nearby/:id')
  findDriversNearby(@Param('id') id: string) {
    return this.passengerService.findDriversNearby(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Passenger> {
    return this.passengerService.findOne(id);
  }
}
