import { IsAlphanumeric, IsBoolean, IsString } from 'class-validator';
import { CreatePassengerDto } from '../../passenger/dto/create-passenger.dto';

export class CreateDriverDto extends CreatePassengerDto {
  @IsString()
  carModel: string;

  @IsString()
  carColor: string;

  @IsAlphanumeric()
  carPlates: string;

  @IsBoolean()
  active: boolean;
}
