import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { AuthService } from 'src/auth/auth.service';
import { DuplicationEmailRequest } from 'src/dto/request/duplication-email.request';

@ApiTags('사용자 API')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post('/register')
  @ApiOperation({ summary: '회원 가입', description: '회원을 가입합니다.' })
  @ApiResponse({ status: 200, description: '회원 가입에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '회원 가입에 실패했습니다.' })
  async create(@Body() userDto: CreateUserRequest, @Res() res: Response) {
    //DB에 새로운 유저 데이터 저장
    const response: DefaultResponseDto = await this.userService.create(userDto);
    
    //정상적으로 저장 완료시 token 발급
    if(response){
      const user = await this.userService.userFind(userDto.email);
      const jwt = this.authService.getAccessToken({ user });

      return res.status(200).json({ message: '회원 가입에 성공했습니다.', token: jwt });
    }

    return res.status(response.status).json(response.data);
  }


  @Post('/duplication')
  @ApiOperation({ summary: '이메일 중복 확인', description: '중복 사용된 이메일이 없는지 확인합니다' })
  @ApiResponse({ status: 200, description: '유효한 사용자 이메일입니다' })
  @ApiResponse({ status: 404, description: '이미 가입된 사용자 입니다' })
  async emailDuplication(@Body() email:DuplicationEmailRequest, @Res() res:Response){

    //DB에 저장된 사용자 데이터와 email 비교
    const response : DefaultResponseDto =  await this.userService.emailCheck(email);

    //사용가능한 email
    if(response.status===200){
      return res.status(200).json({message: '유효한 사용자 이메일입니다'})
    }

    //이미 가입된 email
    return res.status(404).json({message: '이미 가입된 사용자입니다'})

  }
}
