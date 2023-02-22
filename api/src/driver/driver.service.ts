import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import {
  GetDriverCoordinatesDto,
  GetDriverFilterDto,
} from './dto/get-driver-filter.dto';
import { getDistanceByCoordinates, NEAREST_DISTANCE } from '../math/constants';
@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    await this.checkDuplicatePlates(createDriverDto);

    const { latitude, longitude } = createDriverDto;
    delete createDriverDto.latitude;
    delete createDriverDto.longitude;

    const driver = this.driverRepository.create({
      ...createDriverDto,
      coordinates: `${latitude},${longitude}`,
    });

    return this.driverRepository.save(driver);
  }

  private async checkDuplicatePlates(createDriverDto: CreateDriverDto) {
    const duplicatePlates = await this.driverRepository.findOne({
      where: { carPlates: createDriverDto.carPlates },
    });

    if (duplicatePlates) {
      throw new BadRequestException(`This car plate is already register`);
    }
  }

  async findAll(filterDto: GetDriverFilterDto): Promise<Driver[]> {
    const query = this.driverRepository.createQueryBuilder('driver');

    if (filterDto?.active) {
      query.andWhere('driver.active = :active', { active: filterDto.active });
    }

    return await query.getMany();
  }

  async findDriverByCoordinates(
    coordinatesDto: GetDriverCoordinatesDto,
  ): Promise<any[]> {
    const query = await this.findAll({ active: true });
    const { latitude, longitude } = coordinatesDto;
    let nearestDrivers = [];

    for (const item of query) {
      const driverLatitude = item.coordinates.split(',')[0];
      const driverLongitude = item.coordinates.split(',')[1];
      const coordinates = {
        driverLatitude,
        latitude,
        driverLongitude,
        longitude,
      };

      const distance = getDistanceByCoordinates(coordinates);

      if (NEAREST_DISTANCE >= distance) {
        nearestDrivers.push({ distanceInKm: distance, driverInfo: item });
      }
    }

    return nearestDrivers;
  }

  async findOne(id: string): Promise<Driver> {
    const found = await this.driverRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Driver not found`);
    }

    return found;
  }
}
