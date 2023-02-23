import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { Passenger } from '../../passenger/entities/passenger.entity';
import { TripStatus } from '../trip-status.enum';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Driver, (driver) => driver.id)
  driver: Driver;

  @ManyToOne(() => Passenger, (passenger) => passenger.id)
  passenger: Passenger;

  @Column()
  status: TripStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
