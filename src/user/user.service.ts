import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { ReviewEntity } from 'src/entity/review.entity';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { DefaultResponseDto } from '../dto/response/default.response';
import { DuplicationEmailRequest } from '../dto/request/duplication-email.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    // @InjectRepository (DeffuserEntity)
    // private deffuserRepository: Repository<DeffuserEntity>,
  ) {}

  // 이메일를 이용한 기존 사용자 찾기 - 로그인 확인
  async userFind(body) {
    const loginState = await this.userRepository.findOne({
      where: { email: body },
    });

    return loginState;
  }

  // 이메일를 이용한 기존 사용자 찾기 - 회원가입
  async emailCheck(
    emailRequest: DuplicationEmailRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const user: UserEntity = await this.userRepository.findOneBy({
      email: emailRequest.email,
    });
    // 이메일 중복 확인
    //응답별 data 수정 필요
    response.status = user ? 409 : 200;
    return response;
  }

  //새로운 사용자 등록
  async create(userDto: CreateUserRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    // 비밀번호 재확인
    if (userDto.pw != userDto.pwCheck) {
      response.status = 422;
      response.data = '비밀번호가 일치하지 않습니다';

      return response;
    }
    const result: CreateUserRequest = await this.userRepository.save(userDto);

    response.status = result ? 201 : 404;
    response.data = result ? { token: 'token' } : { message: '오류' };
    return response;
  }

  async update(id,userDto){
    console.log(userDto);
    const user= await this.userRepository.update(id,userDto);
    console.log(user);
    return user;

  }


  // 리뷰 작성
  async reviewPost(body) {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const write = await this.reviewRepository.save(body);

    res.status = write ? 200 : 404;
    res.data = write ? { message: '실행 완료' } : { message: '오류' };

    return res;
  }

  //리뷰 삭제
  async reviewDelete(body) {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const findReview = await this.reviewRepository.findOneBy({
      id: body.id,
      userId: body.userId,
    });

    const deleteReview = await this.reviewRepository.delete(findReview);

    response.status = deleteReview ? 200 : 404;
    response.data = deleteReview
      ? { message: '실행 완료' }
      : { message: '오류' };

    return response;
  }
}
