import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Intervention } from './intervention.entity';

@Entity('spare_parts')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Intervention, intervention => intervention.spareParts)
  interventions: Intervention[];
}