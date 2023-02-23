import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { Passenger } from '../../passenger/entities/passenger.entity';


@Entity()
export class Invoice {  
    @PrimaryGeneratedColumn()
    id: string;
  
    @ManyToOne(() => Driver, (driver) => driver.id)
    driver: Driver;
  
    @ManyToOne(() => Passenger, (passenger) => passenger.id)
    passenger: Passenger;
  
    @Column()
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
  }


