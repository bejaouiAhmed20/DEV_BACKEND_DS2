import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Yemna3 el access ken ma 3andekch token
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
