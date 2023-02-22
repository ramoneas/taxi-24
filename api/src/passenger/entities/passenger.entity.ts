import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20 })
    firstName: string;

    @Column("varchar", { length: 20 })
    lastName: string;

    @Column({type: 'decimal'})
    rating: number;

    @Column()
    coordinates: string;
}

