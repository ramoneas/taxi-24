import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverService } from '../driver/driver.service';
import { PassengerService } from '../passenger/passenger.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { TripStatus } from './trip-status.enum';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    private driverRepository: DriverService,
    private passengerRepository: PassengerService,
    private invoiceRepository: InvoiceService,
  ) {}
  async create(createTripDto: CreateTripDto) {
    const passenger = await this.passengerRepository.findOne(
      String(createTripDto.passenger),
    );
    const driver = await this.driverRepository.findOne(
      String(createTripDto.driver),
    );

    return this.tripRepository.save({
      passenger: passenger,
      driver: driver,
      status: TripStatus.PENDING,
    });
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find({
      relations: {
        passenger: true,
        driver: true,
      },
    });
  }

  async findOne(id: string) {
    const found = await this.tripRepository.findOne({
      where: { id },
      relations: { passenger: true, driver: true },
    });

    if (!found) {
      throw new NotFoundException(`Trip not found`);
    }

    return found;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const { status } = updateTripDto;
    const trip = await this.findOne(id);

    this.isTripCompleted(trip);
    trip.status = status;

    if (status == TripStatus.COMPLETED) {
      const passenger = Number(trip.passenger.id);
      const driver = Number(trip.driver.id);
      this.invoiceRepository.create({ passenger, driver });
    }

    return this.tripRepository.save(trip);
  }

  private isTripCompleted(trip: Trip) {
    if (trip.status == TripStatus.COMPLETED) {
      throw new BadRequestException(`This trip is already completed`);
    }
  }
}
