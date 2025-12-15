import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('devices') 
@UseGuards(JwtAuthGuard) 
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // Tkhaly les utilsateurs koll connecté d’enregistrer un appareil
  @Post()
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  // Nraj3ou la liste de tous les appareils
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  // fasskhna device par son id w ynajem ken admin ya3mlha
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: number) {
    return this.devicesService.remove(+id);
  }
}
