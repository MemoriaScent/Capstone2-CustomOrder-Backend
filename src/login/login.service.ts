import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  //사용자 조회
  async userFind(body) {
    const loginState = await this.userRepository.findOne({
      where: { email: body },
    });

    return loginState;
  }
}
