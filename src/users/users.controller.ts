import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { UsersService } from './users.service';

// Controller mta3 el users
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users/profile - Jib el profile mta3 el user connecté (Admin berk)
  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard) // Lazem token w role admin
  @Roles(UserRole.ADMIN) // Barcha el admins berk
  async getProfile(@Request() req) {
    // Njibou el user mel database b ID eli fel token
    const user = await this.usersService.findById(req.user.id);
    // Nraja3ou el info bla el password
    return { id: user!.id, email: user!.email, username: user!.username, role: user!.role };
  }
}
