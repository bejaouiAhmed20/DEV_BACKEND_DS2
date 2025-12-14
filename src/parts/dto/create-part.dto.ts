import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

// DTO bech ncréiw pièce jdida
export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Esm el pièce

  @IsNumber()
  @Min(0) // Stock lazem ykoun >= 0
  stock: number;

  @IsNumber()
  @Min(0) // Prix lazem ykoun >= 0
  price: number;
}
