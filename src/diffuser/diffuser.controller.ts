import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  Get,
  Logger,
  Headers, UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DefaultResponseDto } from 'src/dto/response/default.response';
import { DiffuserService } from './diffuser.service';
import { Response } from 'express';
import { AddDiffuserRequest } from 'src/dto/request/add-diffuser.request';
import { AddCustomDiffuserRequest } from 'src/dto/request/add-custom-diffuser.request';
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('디퓨저 API')
@Controller('diffuser')
export class DiffuserController {
  constructor(
    private readonly diffuserService: DiffuserService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //일반 디퓨저 추가
  @Post('')
  @ApiOperation({
    summary: '일반 디퓨저 정보 추가',
    description: '새로운 일반 디퓨저 상품 정보 추가',
  })
  @ApiResponse({
    status: 201,
    description: '새로운 디퓨저의 상품 정보를 추가했습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '새로운 디퓨저의 상품 정보를 추가하지 못했습니다.',
  })
  async addDiffuser(
    @Body() diffuserDto: AddDiffuserRequest,
    @Res() response: Response,
  ) {
    const res: DefaultResponseDto =
      await this.diffuserService.addDiffuser(diffuserDto);

    if (res.status === 201) {
      return response
        .status(201)
        .json({ message: '새로운 디퓨저의 상품 정보를 추가했습니다.' });
    }

    throw new NotFoundException(
      '새로운 디퓨저 상품 정보를 추가하지 못했습니다.',
    );
  }

  //일반 디퓨저 정보
  @Get('')
  @ApiOperation({
    summary: '디퓨저 정보 가져오기',
    description: '모든 디퓨저 정보를 가져옵니다.',
  })
  @ApiResponse({ status: 200, description: 'data.' })
  @ApiResponse({
    status: 404,
    description: '저장된 디퓨저 정보를 불러오지 못했습니다.',
  })
  async getDiffuser() {
    const data = await this.diffuserService.getDiffuser();

    if (data !== null) {
      return data;
    }

    throw new NotFoundException('저장된 디퓨저 정보를 불러오지 못했습니다.');
  }


  //커스텀 디퓨저 추가
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('/custom')
  @ApiOperation({
    summary: '커스텀 디퓨저 정보 추가',
    description: '새로운 커스텀 디퓨저 상품 정보 추가',
  })
  @ApiResponse({
    status: 201,
    description: '새로운 커스텀 디퓨저 상품 정보를 추가했습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '새로운 커스텀 디퓨저 상품 정보를 추가하지 못했습니다.',
  })
  async addCustomDiffuser(
    @Headers('id') id: number,
    @Body() customDiffuserDto: AddCustomDiffuserRequest,
    @Res() response: Response,
  ) {
    const res: DefaultResponseDto =
      await this.diffuserService.addCustomDiffuser(id, customDiffuserDto);

    if (res.status === 201) {
      return response
        .status(201)
        .json({ message: '새로운 커스텀 디퓨저 상품 정보를 추가했습니다.' });
    }

    throw new NotFoundException(
      '새로운 커스텀 디퓨저 상품 정보를 추가하지 못했습니다.',
    );
  }

  //커스텀 디퓨저 정보
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/custom')
  @ApiOperation({
    summary: '커스텀 디퓨저 정보 가져오기',
    description: '모든 커스텀 디퓨저 상품 정보를 가져옵니다.',
  })
  @ApiResponse({
    status: 201,
    description: '저장된 커스텀 디퓨저 상품 정보를 불러옵니다.',
  })
  @ApiResponse({
    status: 404,
    description: '저장된 커스텀 디퓨저 상품 정보를 불러오지 못했습니다.',
  })
  async getCustomDiffuser() {
    const data = await this.diffuserService.getCustomDiffuser();

    if (data !== null) {
      return data;
    }

    throw new NotFoundException(
      '저장된 커스텀 디퓨저 정보를 불러오지 못했습니다.',
    );
  }
}
