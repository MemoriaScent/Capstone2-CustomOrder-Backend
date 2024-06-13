import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { ReviewEntity } from 'src/entity/review.entity';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { DefaultResponseDto } from '../dto/response/default.response';
import { DuplicationEmailRequest } from '../dto/request/duplication-email.request';
import { DeleteReviewRequest } from '../dto/request/delete-review.request';
import { AddReviewRequest } from '../dto/request/add-review.request';
import { DiffuserEntity } from '../entity/diffuser.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(DiffuserEntity)
    private diffuserEntityRepository: Repository<DiffuserEntity>,
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly logger: Logger,
  ) {}

  // 이메일를 이용한 기존 사용자 찾기 - 로그인 확인
  async userFind(body) {
    const loginState: UserEntity = await this.userRepository.findOne({
      where: { email: body },
    });

    return loginState;
  }

  // 이메일를 이용한 기존 사용자 찾기 - 회원가입
  async emailCheck(email: string): Promise<boolean> {
    // 이메일 중복 확인
    const user: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (user) throw new ConflictException('이미 사용 중인 이메일입니다.');
    return true;
  }

  //새로운 사용자 등록
  async create(userDto: CreateUserRequest): Promise<UserEntity> {
    // 비밀번호 재확인
    if (userDto.pw != userDto.pwCheck) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다');
    }
    //이메일 중복 시 ConflictException이 내부에서 발생
    await this.emailCheck(userDto.email);

    const userEntity: UserEntity = new UserEntity();
    userEntity.email = userDto.email;
    userEntity.pw = userDto.pw;
    userEntity.phone = userDto.phone;
    userEntity.name = userDto.name;
    userEntity.location = userDto.location;
    try {
      return await this.userRepository.save(userEntity);
    } catch (e) {
      this.logger.error(`Create User Error because ${e.name}`);
      throw new InternalServerErrorException(
        '[UserCreation] 서버 관리자에게 문의하세요.',
      );
    }
  }

  async update(id, userDto) {
    console.log(userDto);
    const user = await this.userRepository.update(id, userDto);
    console.log(user);
    return user;
  }

  // 리뷰 작성 ==> ????
    const res: DefaultResponseDto = new DefaultResponseDto();
    const reviewEntity: ReviewEntity = new ReviewEntity();

    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    const diffuser: DiffuserEntity =
      await this.diffuserEntityRepository.findOne({
        where: { id: body.diffuserId },
      });

    reviewEntity.rating = body.rating;
    reviewEntity.detail = body.detail;
    reviewEntity.diffuser = diffuser;
    reviewEntity.user = user;

    const write: ReviewEntity = await this.reviewRepository.save(reviewEntity);

    res.status = write ? 200 : 404;
    res.data = write ? { message: '실행 완료' } : { message: '오류' };

    return res;
  }

  //리뷰 삭제
  async reviewDelete(body: DeleteReviewRequest) {
  //리뷰 삭제 ==> ????
    const response: DefaultResponseDto = new DefaultResponseDto();

    const findReview = await this.reviewRepository.findOneBy({
      id: body.reviewId,
    });

    const deleteReview = await this.reviewRepository.delete(findReview);

    response.status = deleteReview ? 200 : 404;
    response.data = deleteReview
      ? { message: '실행 완료' }
      : { message: '오류' };

    return response;
  }
  async userinfo(id): Promise<UserEntity> {
    const result = await this.userRepository.findOneBy(id);
    if (!result) throw new NotFoundException('존재하지 않는 사용자입니다.');
    return result;
  }
}
