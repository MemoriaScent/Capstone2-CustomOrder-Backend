import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('인증정보가 없습니다.');
    }
    try {
      const decoded = this.jwtService.verify(token.toString(), {
        secret: process.env.JWT_SECRET,
      });
      if (typeof decoded === 'object' && decoded.hasOwnProperty('sub')) {
        request.headers.id = decoded.id;
      }
      return true;
    } catch (e) {
      if (e.name === TokenExpiredError) {
        throw new UnauthorizedException('토큰이 만료되었습니다.');
      }
    }
  }
}
