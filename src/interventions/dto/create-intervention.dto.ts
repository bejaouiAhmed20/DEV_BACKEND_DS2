import { IsNotEmpty, IsNumber, IsArray, IsString } from 'class-validator';

// DTO bech ncréiw intervention
export class CreateInterventionDto {
  @IsNumber()
  @IsNotEmpty()
  deviceId: number; // ID mta3 el appareil

  @IsArray()
  @IsNumber({}, { each: true })
  sparePartIds: number[]; // Liste des IDs mta3 el pièces

  @IsString()
  @IsNotEmpty()
  description: string; // Description mta3 el intervention
}
