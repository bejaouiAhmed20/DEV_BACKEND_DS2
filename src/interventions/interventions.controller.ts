import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../entities/user.entity';

@Controller('interventions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterventionsController {
  constructor(
    private readonly interventionsService: InterventionsService,
  ) {}

  // POST /interventions
  // Ken tech ynajem ya3mel creation lel intervention
  @Post()
  @Roles(UserRole.TECH)
  create(
    @Body() dto: CreateInterventionDto,
    @Req() req,
  ) {
    return this.interventionsService.create(dto, req.user);
  }
}
