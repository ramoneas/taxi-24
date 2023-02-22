import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 20 })
  firstName: string;

  @Column('varchar', { length: 20 })
  lastName: string;

  @Column({ type: 'decimal' })
  rating: number;

  @Column()
  coordinates: string;

  @Column('varchar', { length: 20 })
  carModel: string;

  @Column('varchar', { length: 10 })
  carColor: string;

  @Column('varchar', { length: 10, unique: true })
  carPlates: string;

  @Column()
  active: boolean;  
}
