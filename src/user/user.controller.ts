import { Body, ConflictException, Controller, ForbiddenException, Get, Post, Query, Res, UnprocessableEntityException, Delete, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { Response, response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { AuthService } from 'src/auth/auth.service';
import { DuplicationEmailRequest } from 'src/dto/request/duplication-email.request';
import { AddReviewRequest } from 'src/dto/request/add-review.request';
import { DeleteReviewRequest } from 'src/dto/request/delete-review.request';

@ApiTags('사용자 API')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post('/register')
  @ApiOperation({ summary: '회원 가입', description: '회원을 가입합니다.' })
  @ApiResponse({ status: 201, description: '회원 가입에 성공했습니다.' })
  @ApiResponse({ status: 422, description: '비밀번호가 일치하지 않습니다' })
  async create(@Body() userDto: CreateUserRequest, @Res() response: Response) {
    
    //DB에 새로운 유저 데이터 저장
    const res: DefaultResponseDto = await this.userService.create(userDto);
    
    //정상적으로 저장 완료시 token 발급
    if(res.status===201){

      const user = await this.userService.userFind(userDto.email);
      const jwt = this.authService.getAccessToken({ user });

      return response.status(201).json({ message: '회원 가입에 성공했습니다.', token: jwt });
    }

    throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다');
  }

  @Post('/duplication')
  @ApiOperation({ summary: '이메일 중복 확인', description: '중복 사용된 이메일이 없는지 확인합니다' })
  @ApiResponse({ status: 200, description: '유효한 사용자 이메일입니다' })
  @ApiResponse({ status: 409, description: '이미 가입된 사용자입니다' })
  async emailDuplication(@Body() email:DuplicationEmailRequest, @Res() response:Response){

    //DB에 저장된 사용자 데이터와 email 비교
    const res : DefaultResponseDto =  await this.userService.emailCheck(email);

    //사용가능한 email
    if(res.status===200){
      return response.status(200).json({ message: '유효한 사용자 이메일입니다'})
    }
    
    //이미 가입된 email
    throw new ConflictException('이미 가입된 사용자입니다')

  }

  @Get('/myaccount')
  @ApiOperation({ summary: '개인 정보 확인', description: '사용자의 개인 정보를 가져옵니다' })
  @ApiResponse({ status: 200, description: 'data' })
  @ApiResponse({ status: 404, description: '조회되는 사용자가 없습니다.' })
  async userinfo(@Query() req: DuplicationEmailRequest, @Res() response:Response){

    const user = await this.userService.userFind(req.email);
    
    if(user!==null){
      return response.status(200).json( user );
    }

    throw new NotFoundException('조회되는 사용자가 없습니다.')
  }

  @Post('/review')
  @ApiOperation({ summary: '리뷰 작성', description: '상품의 리뷰를 작성합니다' })
  @ApiResponse({ status: 201, description: '리뷰가 정상적으로 작성되었습니다' })
  @ApiResponse({ status: 409, description: '리뷰가 정상적으로 작성되지 않았습니다.' })
  async writeReview(@Body() reviewDto : AddReviewRequest, @Res() response: Response){

    const result = await this.userService.reviewPost(reviewDto);

    if(result){
      return response.status(200).json('{ data: 리뷰가 정상적으로 작성되었습니다. }');
    }
    throw new ForbiddenException('리뷰가 정상적으로 작성되지 않았습니다.')
  }

  @Delete('/review')
  @ApiOperation({ summary: '리뷰 삭제', description: '상품의 리뷰를 삭제합니다' })
  @ApiResponse({ status: 200, description: '리뷰가 정상적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '리뷰 정상적으로 삭제되지 않았습니다.' })
  async deleteReview(@Body() deleteReviewDto:DeleteReviewRequest, @Res() response: Response){

    const result = await this.userService.reviewDelete(deleteReviewDto);

    if(result){
      return response.status(200).json('{ data: 리뷰가 정상적으로 삭제되었습니다. }');
    }
    throw new ForbiddenException('리뷰가 정상적으로 삭제되지 않았습니다.')
  }

}
