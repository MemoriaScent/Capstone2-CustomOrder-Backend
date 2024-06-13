import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  Res, UseGuards
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { CartService } from './cart.service';
import { CreateCartRequest } from '../dto/request/createCart.request';
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('장바구니 API')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: '장바구니 담기',
    description: '디퓨저를 장바구니에 담습니다.',
  })
  @ApiResponse({ status: 201, description: '디퓨저를 장바구니에 담았습니다.' })
  @ApiResponse({
    status: 404,
    description: '해당 사용자 또는 디퓨저를 찾지 못했습니다.',
  })
  async create(
    @Headers('id') id: number,
    @Body() createCartRequest: CreateCartRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.cartService.create(
      Number(id),
      createCartRequest,
    );
    return res.status(response.status).json(response.data);
  }

  @Get()
  @ApiOperation({
    summary: '장바구니 조회',
    description: '사용자의 장바구니을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자가 장바구니에 담은 내역이 존재합니다.',
  })
  @ApiResponse({
    status: 204,
    description: '사용자가 장바구니에 담은 내역이 없습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '사용자의 장바구니 조회에 실패했습니다.',
  })
  async read(@Headers('id') id: number, @Res() res: Response) {
    const response: DefaultResponseDto = await this.cartService.read(
      Number(id),
    );
    return res.status(response.status).json(response.data);
  }
}
