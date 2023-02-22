import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';
import { DriverService } from '../driver/driver.service';

const NEAREST_DRIVERS_QTY: number = 3;

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
    private driverRepository: DriverService,
  ) {}

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const { firstName, lastName, latitude, longitude, rating } =
      createPassengerDto;

    const passenger = this.passengerRepository.create({
      firstName,
      lastName,
      rating,
      coordinates: `${latitude},${longitude}`,
    });

    return this.passengerRepository.save(passenger);
  }

  async findAll(): Promise<Passenger[]> {
    const query = this.passengerRepository.createQueryBuilder('passenger');

    return await query.getMany();
  }

  async findDriversNearby(id: string): Promise<any[]> {
    const { coordinates } = await this.findOne(id);
    let filterDrivers = [];

    const drivers = await this.driverRepository.findDriverByCoordinates({
      latitude: coordinates.split(',')[0],
      longitude: coordinates.split(',')[1],
    });

    this.sortDriversByNearest(drivers);

    for (const driver of drivers) {
      if (filterDrivers.length === NEAREST_DRIVERS_QTY) {
        return filterDrivers;
      }
      filterDrivers.push(driver);
    }

    return filterDrivers;
  }

  private sortDriversByNearest(drivers: any[]) {
    drivers.sort((a, b) => (a.distanceInKm < b.distanceInKm ? -1 : 1));
  }

  async findOne(id: string): Promise<Passenger> {
    const found = await this.passengerRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Passenger not found`);
    }

    return found;
  }
}
