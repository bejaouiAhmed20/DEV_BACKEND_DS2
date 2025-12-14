import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from './intervention.entity';

// Enum mta3 el roles (ADMIN walla TECH)
export enum UserRole {
  ADMIN = 'ADMIN', // Manager
  TECH = 'TECH'    // Technicien
}

// Entity User (table users fel database)
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Email unique (ma ynjamch user theni b nafs el email)
  email: string;

  @Column() // Password mhaché b bcrypt
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH // Par défaut kol user jdid TECH
  })
  role: UserRole;

  @OneToMany(() => Intervention, intervention => intervention.user) // User ynajem ya3mel barcha interventions
  interventions: Intervention[];
}