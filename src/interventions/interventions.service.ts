import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

  // Ncréiw intervention (technicien berk)
  async create(dto, technician) {
    // Nverifiw ken el device mawjoud
    const device = await this.deviceRepo.findOne({ where: { id: dto.deviceId } });
    if (!device) throw new BadRequestException('Device mawjoudech');

    // Njibou el pièces
    const spareParts = await this.sparePartRepo.find({
      where: { id: In(dto.sparePartIds) },
    });

    // Nverifiw el stock w ndécrémentiwhom
    for (const part of spareParts) {
      if (part.stock <= 0) {
        throw new BadRequestException(`Stock insuffisant pour ${part.name}`);
      }
      part.stock--;
      await this.sparePartRepo.save(part);
    }

    // Nbaddlou el status lel REPAIRING
    device.status = DeviceStatus.REPAIRING;
    await this.deviceRepo.save(device);

    // Ncréiw el intervention
    const intervention = this.interventionRepo.create({
      description: dto.description,
      date: new Date(),
      user: technician,
      device: device,
      spareParts: spareParts,
    });

    return this.interventionRepo.save(intervention);
  }
}
