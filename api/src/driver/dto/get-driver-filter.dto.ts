import {
  IsBooleanString,
  IsLatitude,
  IsLongitude,
  IsOptional,
} from 'class-validator';

export class GetDriverFilterDto {
  @IsOptional()
  @IsBooleanString()
  active?: boolean;
}
export class GetDriverCoordinatesDto {
  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;
}
