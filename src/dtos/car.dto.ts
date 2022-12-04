import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  UUID: string;

  @IsString()
  VIN: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsString()
  mileage: number;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsString()
  zipCode: string;

  @IsDate()
  createDate: Date;

  @IsDate()
  updateDate: Date;
}
