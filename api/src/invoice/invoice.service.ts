import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverService } from '../driver/driver.service';
import { PassengerService } from '../passenger/passenger.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { getRandomPrice } from '../math/constants';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    private driverRepository: DriverService,
    private passengerRepository: PassengerService,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const passenger = await this.passengerRepository.findOne(
      String(createInvoiceDto.passenger),
    );
    const driver = await this.driverRepository.findOne(
      String(createInvoiceDto.driver),
    );

    return this.invoiceRepository.save({
      passenger: passenger,
      driver: driver,
      price: createInvoiceDto?.price || getRandomPrice(),
    });
  }

  async findAll() {
    return this.invoiceRepository.find({
      relations: {
        passenger: true,
        driver: true,
      },
    });
  }

  async findOne(id: string) {
    const found = await this.invoiceRepository.findOne({
      where: { id },
      relations: { passenger: true, driver: true },
    });

    if (!found) {
      throw new NotFoundException(`Invoice not found`);
    }

    return found;
  }
}
