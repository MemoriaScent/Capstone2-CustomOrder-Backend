import {
  Body,
  Controller,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { compare } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; pw: string },
    @Res() response: Response,
  ) {
    const user = await this.loginService.userFind(body.email);

    //사용자 정보 없음
    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }

    const isAuth = await (body.pw === user.pw);

    //비밀번호 불일치
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호를 확인해주세요.');
    }

    const jwt = this.authService.getAccessToken({ user });

    return response.status(200).json(jwt);
  }
}
