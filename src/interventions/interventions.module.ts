import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from '../entities/intervention.entity';
import { SparePart } from '../entities/spare-part.entity';
import { Device } from '../entities/device.entity';

@Module({

    // 3malna declaration leel les entités que typeORM ynajeem ygerehom feel module heedhy
  imports: [
    TypeOrmModule.forFeature([
      Intervention,
      SparePart,
      Device,
    ]),
  ],

  // Déclaration des providers (services) disponibles dans ce module
  providers: [InterventionsService],

  // Déclaration des contrôleurs qui vont gérer les routes HTTP
  controllers: [InterventionsController],
})
export class InterventionsModule {}
