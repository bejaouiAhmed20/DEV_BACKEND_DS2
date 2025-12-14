import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from '../entities/spare-part.entity';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  providers: [PartsService],
  controllers: [PartsController],
  exports: [PartsService],
})
export class PartsModule {}
