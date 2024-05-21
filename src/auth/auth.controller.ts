import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //사용자 로그인
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인성공' })
  async login(
    @Body() body: { email: string; pw: string },
    @Res() response: Response,
  ) {
    const user = await this.userService.userFind(body.email);

    //사용자 정보 없음
    if (!user) {
      throw new NotFoundException('이메일이 없습니다.');
    }

    const isAuth = await (body.pw === user.pw);

    //비밀번호 불일치
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호를 확인해주세요.');
    }

    const jwt = this.authService.getAccessToken({ user });

    return response.status(200).json({ message: '로그인 성공', token: jwt });
  }
}
