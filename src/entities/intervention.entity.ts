import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';
import { SparePart } from './spare-part.entity';

// Entity Intervention (fiche de réparation - table interventions fel database)
@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Date mta3 el intervention
  date: Date;

  @Column() // Description (chnou sra w chnou tsalla7)
  description: string;

  @ManyToOne(() => User, user => user.interventions) // Intervention ma3mouha user we7ed (technicien)
  user: User;

  @ManyToOne(() => Device, device => device.interventions) // Intervention 3la device we7ed
  device: Device;

  @ManyToMany(() => SparePart, sparePart => sparePart.interventions) // Intervention tnajem testa3mel barcha pièces
  @JoinTable() // JoinTable bech tcréi table intermédiaire (many-to-many)
  spareParts: SparePart[];
}