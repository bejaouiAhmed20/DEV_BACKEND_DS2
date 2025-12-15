import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from '../entities/device.entity';

@Module({
  // 3malna importation leel repository Device pour TypeORM
  imports: [TypeOrmModule.forFeature([Device])],

  // Service fyh la logique métier
  providers: [DevicesService],

  // Controller qui gère les routes HTTP
  controllers: [DevicesController],
})
export class DevicesModule {}