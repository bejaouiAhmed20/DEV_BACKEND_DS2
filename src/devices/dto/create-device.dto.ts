import { IsNotEmpty, IsString } from 'class-validator';

// DTO bech ncréiw device jdid
export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}
