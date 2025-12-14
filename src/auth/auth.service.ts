import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // Tsajjel user jdid (inscription)
  async register(registerDto: RegisterDto) {
    // Nlawej 3al email ken mawjoud déjà
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) throw new ConflictException('Email mawjoud déjà');

    // Nhachew el password b bcrypt (10 rounds)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Ncréiw el user jdid (par défaut TECH)
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: UserRole.TECH, // Kol user jdid yetsajjel TECH
    });

    // Nraja3ou el user bla el password
    return { id: user.id, email: user.email, username: user.username, role: user.role };
  }

  // Login (connexion)
  async login(loginDto: LoginDto) {
    // Nlawej 3al user b email
    const user = await this.usersService.findByEmail(loginDto.email);
    
    // Nverifiw el user mawjoud w el password s7i7
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email walla password ghalet');
    }

    // Ncréiw el JWT payload (sub = user id)
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    // Nraja3ou el token w el user info
    return {
      access_token: this.jwtService.sign(payload), // JWT token
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
    };
  }
}
