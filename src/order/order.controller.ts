import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderService } from './order.service';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { EmailRequest } from '../dto/request/email.request';

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
  async read(@Body() emailRequest: EmailRequest, @Res() res: Response) {
    const response: DefaultResponseDto =
      await this.userService.read(emailRequest);
    return res.status(response.status).json(response.data);
  }

  @Get('/detail')
  @ApiOperation({
    summary: '주문 상세 조회',
    description: '주문을 상세하게 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '주문 상세 조회에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 상세 조회에 실패했습니다.' })
  async readDetail(
    @Body() readOrderDetailRequest: ReadOrderDetailRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.userService.readDetail(
      readOrderDetailRequest,
    );
    if (response.status === 404) this.logger.error('주문 상세 조회 오류');
    return res.status(response.status).json(response.data);
  }

  @Post('/cancel')
  @ApiOperation({
    summary: '주문 취소',
    description: '주문을 취소합니다.',
  })
  @ApiResponse({ status: 200, description: '주문 취소에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 취소에 실패했습니다.' })
  async orderCancel(
    @Body() createOrderCancelRequest: CreateOrderCancelRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.userService.orderCancel(
      createOrderCancelRequest,
    );
    if (response.status === 404) this.logger.error('주문 취소 오류');
    return res.status(response.status).json(response.data);
  }
}
