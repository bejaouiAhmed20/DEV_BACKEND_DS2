import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

// Controller mta3 el pièces détachées
@Controller('parts')
@UseGuards(JwtAuthGuard) // Kol el routes lazem token
export class PartsController {
  constructor(private partsService: PartsService) {}

  // GET /parts - Jib kol el pièces (kol wa7ed authentifié ynajem ychouf)
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  // POST /parts - Créer pièce jdida (Admin berk)
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreatePartDto) {
    return this.partsService.create(dto);
  }

  // PATCH /parts/:id - Modifier pièce (Admin berk)
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdatePartDto) {
    return this.partsService.update(+id, dto);
  }

  // DELETE /parts/:id - Supprimer pièce (Admin berk)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.partsService.remove(+id);
  }
}
