import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultResponseDto } from '../dto/response/default.response';

@ApiTags('사용자 API')
@Controller('user')
export class LoginController {
  constructor(private userService: LoginService) {}
  @Post('/login')
  @ApiOperation({ summary: '로그인', description: '로그인 여부 확인' })
  @ApiResponse({ status: 200, description: " token: 'jwt 전달 예정입니다'" })
  @ApiResponse({
    status: 404,
    description: "data = { msg: '아이디,비밀번호를 다시 확인해주세요.' }",
  })
  async login(
    @Body() body: { email: string; pw: string },
    @Res() response: Response,
  ): Promise<Response> {
    const result: DefaultResponseDto = await this.userService.login(body);
    console.log(result);
    if (result) return response.status(200).json(result);
    else return response.status(400).json(result);
  }
}
