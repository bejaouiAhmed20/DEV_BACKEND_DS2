import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from './intervention.entity';

// Enum mta3 el status mta3 el appareil
export enum DeviceStatus {
  PENDING = 'PENDING',     // Mestanni (jdid dkhel)
  REPAIRING = 'REPAIRING', // 9a3ed yetsalla7
  READY = 'READY'          // Jehéz (tsalla7)
}

// Enum mta3 el grade (7alet el appareil)
export enum DeviceGrade {
  A = 'A',       // Etat comme neuf (a7sen 7ala)
  B = 'B',       // Très bon état
  C = 'C',       // Etat correct
  NONE = 'NONE'  // Pas d'état (par défaut)
}

// Entity Device (table devices fel database)
@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Numéro de série mta3 el appareil
  serialNumber: string;

  @Column() // Marque (iPhone, Samsung...)
  brand: string;

  @Column() // Modèle (iPhone 12, Galaxy S21...)
  model: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING // Par défaut PENDING (mestanni)
  })
  status: DeviceStatus;

  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE // Par défaut NONE (ma fammech grade)
  })
  grade: DeviceGrade;

  @OneToMany(() => Intervention, intervention => intervention.device) // Device ynajem ykoun fih barcha interventions
  interventions: Intervention[];
}