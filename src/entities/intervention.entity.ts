import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';
import { SparePart } from './spare-part.entity';

@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.interventions)
  user: User;

  @ManyToOne(() => Device, device => device.interventions)
  device: Device;

  @ManyToMany(() => SparePart, sparePart => sparePart.interventions)
  @JoinTable()
  spareParts: SparePart[];
}