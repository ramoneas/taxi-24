import { IsInt, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsInt()
  driver: number;

  @IsInt()
  passenger: number;

  @IsNumber()
  price?: number;
}
