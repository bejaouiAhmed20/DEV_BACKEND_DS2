import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

// DTO bech nbaddlou pièce (kol chay optional)
export class UpdatePartDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
