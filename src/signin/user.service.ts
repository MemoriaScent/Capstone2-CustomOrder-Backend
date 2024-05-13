import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(body: UserEntity) {
    const result = { status: undefined, data: undefined };
    const loginState: Promise<UserEntity> = this.userRepository.findOne({
      where: { email: body.email, password: body.password },
    });
    //로그인 성공
    if (loginState) {
      result.status(200);
      result.data('토큰');
      return result;
    }
    //로그인 실패
    else {
      result.status(400);
      return result;
    }
  }
}
