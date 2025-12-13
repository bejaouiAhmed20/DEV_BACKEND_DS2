import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from './intervention.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  TECH = 'TECH'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH
  })
  role: UserRole;

  @OneToMany(() => Intervention, intervention => intervention.user)
  interventions: Intervention[];
}