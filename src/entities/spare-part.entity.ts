import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Intervention } from './intervention.entity';

// Entity SparePart (pièce détachée - table spare_parts fel database)
@Entity('spare_parts')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Esm el pièce (Ecran OLED, Batterie...)
  name: string;

  @Column() // Stock (9adech famma menhom)
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 }) // Prix (decimal b 2 chiffres ba3d el virgule)
  price: number;

  @ManyToMany(() => Intervention, intervention => intervention.spareParts) // Pièce tnajem tetsta3mel fi barcha interventions
  interventions: Intervention[];
}