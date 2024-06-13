import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken(user: UserEntity): string {
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
