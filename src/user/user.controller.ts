import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Headers,
  Res,
  Delete,
  UnprocessableEntityException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from './user.service';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { DuplicationEmailRequest } from 'src/dto/request/duplication-email.request';
import { AddReviewRequest } from 'src/dto/request/add-review.request';
import { DeleteReviewRequest } from 'src/dto/request/delete-review.request';
import { UpdateUserRequest } from 'src/dto/request/update-user.request';
import { UserEntity } from '../entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('사용자 API')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  @ApiOperation({
    summary: '회원 가입',
    description: '새로운 사용자 정보를 추가합니다',
  })
  @ApiResponse({ status: 201, description: '회원 가입에 성공했습니다.' })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일입니다.' })
  @ApiResponse({ status: 422, description: '비밀번호가 일치하지 않습니다' })
  async create(@Body() userDto: CreateUserRequest, @Res() response: Response) {
    //회원가입
    const result: UserEntity = await this.userService.create(userDto);

    //정상적으로 저장 완료시 token 발급
    if (result) {
      const jwt = this.authService.getAccessToken(result);

      return response
        .status(201)
        .json({ message: '회원 가입에 성공했습니다.', token: jwt });
    }

    throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/myaccount')
  @ApiOperation({
    summary: '개인 정보 확인',
    description: '사용자의 개인 정보를 가져옵니다',
  })
  @ApiResponse({
    status: 200,
    description: '사용자의 email, 주소, 전화번호를 가져옵니다. ',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 사용자입니다.',
  })
  async userinfo(
    @Headers('id') id: number,
    //@Res() response: Response,
  ): Promise<UserEntity> {
    return await this.userService.userinfo(id);
  }

  @Post('/duplication')
  @ApiOperation({
    summary: '이메일 중복 확인',
    description: '중복 사용된 이메일이 없는지 확인합니다',
  })
  @ApiResponse({ status: 200, description: '유효한 사용자 이메일입니다.' })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일입니다.' })
  @HttpCode(200)
  async emailDuplication(@Body() email: DuplicationEmailRequest) {
    //DB에 저장된 사용자 데이터와 email 비교
    await this.userService.emailCheck(email.email);
    return '유효한 사용자 이메일입니다';
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('/update')
  @ApiOperation({
    summary: '개인 정보 수정',
    description: '사용자의 개인 정보를 수정합니다',
  })
  @ApiResponse({ status: 200, description: '회원 정보 수정에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '회원 정보가 수정되지 않았습니다' })
  async updateUser(
    @Body() userDto: UpdateUserRequest,
    @Res() response: Response,
  ) {
    const uservali = await this.authService.tokenValidate(userDto.token);
    if (uservali) {
      const id = await this.userService.userFind(userDto.email);
      const user = await this.userService.update(id, userDto);
      if (user) {
        return response
          .status(201)
          .json({ message: '회원 정보 수정에 성공했습니다.' });
      }
    }
    throw new ForbiddenException('회원 정보가 수정되지 않았습니다');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('/review')
  @ApiOperation({
    summary: '리뷰 작성',
    description: '상품의 리뷰를 작성합니다',
  })
  @ApiResponse({ status: 201, description: '리뷰가 정상적으로 작성되었습니다' })
  @ApiResponse({
    status: 409,
    description: '리뷰가 정상적으로 작성되지 않았습니다.',
  })
  async writeReview(
    @Headers('id') id: number,
    @Body() reviewDto: AddReviewRequest,
    @Res() response: Response,
  ) {
    const result = await this.userService.reviewPost(id, reviewDto);

    if (result) {
      return response.status(200).json('리뷰가 정상적으로 작성되었습니다.');
    }
    throw new ForbiddenException('리뷰가 정상적으로 작성되지 않았습니다.');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('/review')
  @ApiOperation({
    summary: '리뷰 삭제',
    description: '상품의 리뷰를 삭제합니다',
  })
  @ApiResponse({
    status: 200,
    description: '리뷰가 정상적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '리뷰 정상적으로 삭제되지 않았습니다.',
  })
  async deleteReview(
    @Body() deleteReviewDto: DeleteReviewRequest,
    @Res() response: Response,
  ) {
    const result = await this.userService.reviewDelete(deleteReviewDto);

    if (result) {
      return response
        .status(200)
        .json('{ data: 리뷰가 정상적으로 삭제되었습니다. }');
    }
    throw new ForbiddenException('리뷰가 정상적으로 삭제되지 않았습니다.');
  }
}
