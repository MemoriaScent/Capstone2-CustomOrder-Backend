import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }): string {
    return this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '5m',
      },
    );
  }

  async tokenValidate(token) {
    const id = await this.jwtService.decode(token.token);
    return id.email;
  }
}
