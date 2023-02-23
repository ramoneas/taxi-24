import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { Driver } from './driver/entities/driver.entity';
import { Passenger } from './passenger/entities/passenger.entity';
import { PassengerModule } from './passenger/passenger.module';
import { Trip } from './trip/entities/trip.entity';
import { TripModule } from './trip/trip.module';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_SUPABASE_HOST,
      port: Number(process.env.DB_SUPABASE_PORT),
      username: process.env.DB_SUPABASE_USERNAME,
      password: process.env.DB_SUPABASE_PASSWORD,
      database: process.env.DB_SUPABASE_NAME,
      entities: [Passenger, Driver, Trip, Invoice],
      synchronize: false,
    }),
    DriverModule,
    PassengerModule,
    TripModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
