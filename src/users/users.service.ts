import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

// Service bech nkhadmou 3al users
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  // Nlawej 3al user b email (bech nverifiw fel login w register)
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Nlawej 3al user b ID (bech njibou el profile)
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Ncréiw user jdid w nsauviw-h fel database
  async create(userData: Partial<User>): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(userData));
  }
}
