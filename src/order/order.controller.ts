import { Body, Controller, Get, Logger, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderService } from './order.service';

@ApiTags('주문 API')
@Controller('order')
export class OrderController {
  constructor(
    private readonly userService: OrderService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOperation({ summary: '주문 조회', description: '주문을 조회합니다.' })
  @ApiResponse({ status: 200, description: '주문 조회에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 조회에 실패했습니다.' })
  async read(@Body() email: string, @Res() res: Response) {
    const response: DefaultResponseDto = await this.userService.read(email);
    if (response.status === 404) this.logger.error('BEE');
    return res.status(response.status).json(response.data);
  }
}
