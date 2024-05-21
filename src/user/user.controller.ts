import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';

@ApiTags('사용자 API')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '회원 가입', description: '회원을 가입합니다.' })
  @ApiResponse({ status: 200, description: '회원 가입에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '회원 가입에 실패했습니다.' })
  async create(@Body() userDto: CreateUserRequest, @Res() res: Response) {
    const response: DefaultResponseDto = await this.userService.create(userDto);
    return res.status(response.status).json(response.data);
  }
}
