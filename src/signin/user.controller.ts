import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entity/user.entity';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 여부 확인',
  })
  @Post()
  async login(
    @Body() body: UserEntity,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.userService.login(body);
    return res.status(result.status).json(result.data);
  }
}
