import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { DefaultResponseDto } from '../dto/response/default.response';
import { DuplicationEmailRequest } from '../dto/request/duplication-email.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async userFind(body) {
    const loginState = await this.userRepository.findOne({
      where: { email: body },
    });

    return loginState;
  }

  async emailCheck(
    emailRequest: DuplicationEmailRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    // 이메일를 이용한 기존 사용자 찾기
    const user: UserEntity = await this.userRepository.findOneBy({
      email: emailRequest.email,
    });
    // 이메일 중복 확인
    //응답별 data 수정 필요
    response.status = user ? 404 : 200;
    return response;
  }

  async create(userDto: CreateUserRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    // 비밀번호 재확인
    if (userDto.pw != userDto.pwCheck) {
      response.status = 404;
      response.data = { msg: '비밀번호 오류' };
      return response;
    }
    const result: CreateUserRequest = await this.userRepository.save(userDto);
    response.status = result ? 200 : 404;
    response.data = result ? 'token' : { msg: '오류' };
    console.log(response);
    return response;
  }
}
