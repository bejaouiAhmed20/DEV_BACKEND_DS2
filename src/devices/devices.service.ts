// src/devices/devices.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {

    // 3malna injection m repostory device beech najmou on accéde leel BD
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  // 3malna Création d’un nouvel appareil
  create(dto: CreateDeviceDto) {

    // M dto 3malna création leel objet device
    const device = this.deviceRepo.create(dto);

    // On a sauvegardé feel BD
    return this.deviceRepo.save(device);
  }
// Jebna la liste de tous les appareils
  findAll() {
    return this.deviceRepo.find();
  }
// fassakhna l'appareil beel ID mtee3ha 
  remove(id: number) {
    return this.deviceRepo.delete(id);
  }
}
