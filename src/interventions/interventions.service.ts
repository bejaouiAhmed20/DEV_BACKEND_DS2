import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from '../entities/intervention.entity';
import { SparePart } from '../entities/spare-part.entity';
import { Device, DeviceStatus } from '../entities/device.entity';


@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionRepo: Repository<Intervention>,

    @InjectRepository(SparePart)
    private sparePartRepo: Repository<SparePart>,

    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  // 3malna création leel intervention w ken leel technician seulement
  async create(dto, technician) {
    
    // 3malna vérification ken l'appareil existe
    const device = await this.deviceRepo.findOne({
      where: { id: dto.deviceId },
    });

    if (!device) {
      throw new BadRequestException('Device not found');
    }

    // 3malna recupération lel pièces utilisées
    const spareParts = await this.sparePartRepo.findByIds(
      dto.sparePartIds,
    );

    // 3malna vérification et décrémentation le stock
    for (const part of spareParts) {
      if (part.stock <= 0) {
        throw new BadRequestException(
          `Stock insuffisant pour ${part.name}`,
        );
      }
      part.stock--;
      await this.sparePartRepo.save(part);
    }

    // Hatyna device en REPAIRING
    device.status = DeviceStatus.REPAIRING;
    await this.deviceRepo.save(device);

    // On a crée l'intervention
    const intervention = new Intervention();
    intervention.description = dto.description;
    intervention.date = new Date();
    intervention.user = technician;
    intervention.device = device;
    intervention.spareParts = spareParts;

    return this.interventionRepo.save(intervention);

    return this.interventionRepo.save(intervention);
  }
}
