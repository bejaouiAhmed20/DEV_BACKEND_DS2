import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from '../entities/spare-part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

// Service bech nkhadmou 3al pièces
@Injectable()
export class PartsService {
  constructor(@InjectRepository(SparePart) private partsRepository: Repository<SparePart>) {}

  // Jib kol el pièces
  async findAll(): Promise<SparePart[]> {
    return this.partsRepository.find();
  }

  // Jib pièce b ID
  async findOne(id: number): Promise<SparePart> {
    const part = await this.partsRepository.findOne({ where: { id } });
    if (!part) throw new NotFoundException('Pièce mawjouda');
    return part;
  }

  // Créer pièce jdida
  async create(createPartDto: CreatePartDto): Promise<SparePart> {
    return this.partsRepository.save(this.partsRepository.create(createPartDto));
  }

  // Modifier pièce
  async update(id: number, updatePartDto: UpdatePartDto): Promise<SparePart> {
    const part = await this.findOne(id);
    Object.assign(part, updatePartDto);
    return this.partsRepository.save(part);
  }

  // Supprimer pièce
  async remove(id: number): Promise<void> {
    const part = await this.findOne(id);
    await this.partsRepository.remove(part);
  }
}
