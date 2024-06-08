import { Body, Controller, Get, Logger, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { EmailRequest } from '../dto/request/email.request';
import { CartService } from './cart.service';

@ApiTags('장바구니 API')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOperation({
    summary: '장바구니 조회',
    description: '사용자의 장바구니을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자가 장바구니에 담은 내역이 존재합니다.' })
  @ApiResponse({ status: 404, description: '사용자가 장바구니에 담은 내역이 없습니다.' })
  @ApiResponse({ status: 404, description: '사용자의 장바구니 조회에 실패했습니다.' })
  async read(@Body() emailRequest: EmailRequest, @Res() res: Response) {
    const response: DefaultResponseDto =
      await this.cartService.read(emailRequest);
    return res.status(response.status).json(response.data);
  }
}
