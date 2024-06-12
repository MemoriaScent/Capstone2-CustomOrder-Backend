import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderService } from './order.service';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { IdRequest } from '../dto/request/id.request';
import { CreateOrderRequest } from '../dto/request/createOrder.request';

@ApiTags('주문 API')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: '결제 후 주문 넘어가기',
    description: '주문을 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '주문 생성에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  @ApiResponse({
    status: 500,
    description: '주문을 저장하는 동안 오류가 발생했습니다.',
  })
  async create(
    @Body() createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto =
      await this.orderService.create(createOrderRequest);
    return res.status(response.status).json(response.data);
  }

  @Get('')
  @ApiOperation({ summary: '주문 조회', description: '주문을 조회합니다.' })
  @ApiResponse({ status: 200, description: '주문 조회에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 조회에 실패했습니다.' })
  async read(@Body() idRequest: IdRequest, @Res() res: Response) {
    const response: DefaultResponseDto =
      await this.orderService.read(idRequest);
    return res.status(response.status).json(response.data);
  }

  @Get('detail')
  @ApiOperation({
    summary: '주문 상세 조회',
    description: '주문을 상세하게 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '주문 상세 조회에 성공했습니다.' })
  @ApiResponse({ status: 204, description: '주문한 상세 내역이 없습니다.' })
  @ApiResponse({
    status: 403,
    description: '해당 내역을 주문한 회원이 아닙니다.',
  })
  @ApiResponse({ status: 404, description: '주문 상세 조회에 실패했습니다.' })
  async readDetail(
    @Body() readOrderDetailRequest: ReadOrderDetailRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.orderService.readDetail(
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
  @ApiResponse({ status: 201, description: '주문 취소에 성공했습니다.' })
  @ApiResponse({ status: 500, description: '주문 취소에 실패했습니다.' })
  async orderCancel(
    @Body() createOrderCancelRequest: CreateOrderCancelRequest,
  ) {
    return this.orderService.orderCancel(createOrderCancelRequest);
  }

  @Get('/pay')
  async readPay(@Body() emailRequest: IdRequest, @Res() res: Response) {
    const response: DefaultResponseDto =
      await this.orderService.read(emailRequest);
    return res.status(response.status).json(response.data);
  }
}
