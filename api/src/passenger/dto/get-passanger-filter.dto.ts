/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetPassengerFilterDto {
  @IsNotEmpty()
  @IsNumberString()
  passengerId: number;
}
