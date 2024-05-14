import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(body) {
    const response: DefaultResponseDto = new DefaultResponseDto();
    const pw = body.password;
    const loginState = await this.userRepository.findOne({
      where: { email: body.email, pw: body.password },
    });
    //로그인 성공
    console.log(loginState);
    console.log(pw);
    if (loginState) {
      response.status = 200;
      response.data = {
        token: 'jwt 전달 예정입니다' + body.email + body.password,
      };
      return response;
    }
    //로그인 실패
    else {
      response.status = 404;
      response.data = { msg: '아이디,비밀번호를 다시 확인해주세요.' };
      return response;
    }
  }
}
