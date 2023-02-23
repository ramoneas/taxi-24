import { IsEnum } from 'class-validator';
import { TripStatus } from '../trip-status.enum';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  status: TripStatus;
}
