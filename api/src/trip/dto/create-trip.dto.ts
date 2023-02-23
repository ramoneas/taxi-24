import { IsInt } from 'class-validator';

export class CreateTripDto {
  @IsInt()
  driver: number;

  @IsInt()
  passenger: number;
}
