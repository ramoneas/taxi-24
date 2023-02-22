import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { GetDriverCoordinatesDto, GetDriverFilterDto } from './dto/get-driver-filter.dto';
import { Driver } from './entities/driver.entity';

@Controller('api/driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  findAll(@Query() filterDto: GetDriverFilterDto): Promise<Driver[]> {
    return this.driverService.findAll(filterDto);
  }

  @Get('nearby')
  findDriverByCoordinates(@Query() coordinatesDto: GetDriverCoordinatesDto): Promise<Driver[]> {
    return this.driverService.findDriverByCoordinates(coordinatesDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Driver> {
    return this.driverService.findOne(id);
  }
}
