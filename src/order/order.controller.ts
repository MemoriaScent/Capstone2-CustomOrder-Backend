import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderService } from './order.service';

@ApiTags('주문 API')
@Controller('order')
export class OrderController {
  constructor(private userService: OrderService) {}

  @Post('/order')
  @ApiOperation({ summary: '주문 조회', description: '주문을 조회합니다.' })
  @ApiResponse({ status: 200, description: '주문 조회에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 조회에 실패했습니다.' })
  async read(@Body() uid: number, @Res() res: Response) {
    const response: DefaultResponseDto = await this.userService.read(uid);
    return res.status(response.status).json(response.data);
  }
}
