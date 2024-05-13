import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { DefaultResponseDto } from '../dto/response/default.response';
import { DuplicationEmailRequest } from '../dto/request/duplication-email.request';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async emailCheck(
    emailRequest: DuplicationEmailRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    // 이메을를 이용한 기존 사용자 찾기
    const user: UserEntity = await this.userRepository.findOneBy({
      email: emailRequest.email,
    });
    // 기존 사용자 중 해당 이메일의 존재 여부에 따른 이메일 미중복 확인 실패/성공
    response.status = user ? 404 : 200;
    return response;
  }

  async create(userDto: CreateUserRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    // 비밀번호 재확인
    if (userDto.pw != userDto.pwCheck) {
      response.status = 404;
      response.token = '비밀번호 오류';
      return response;
    }
    const result: CreateUserRequest = await this.userRepository.save(userDto);
    response.status = result ? 200 : 404;
    response.token = result ? 'token' : '오류';
    console.log(response);
    return response;
  }
}
