import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { PassengerModule } from '../passenger/passenger.module';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), PassengerModule, DriverModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],  
  exports: [InvoiceService]
})
export class InvoiceModule {}
