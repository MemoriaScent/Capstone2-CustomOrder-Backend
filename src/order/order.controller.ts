import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderService } from './order.service';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { CreateOrderRequest } from '../dto/request/createOrder.request';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('주문 API')
@Controller('order')
@UseGuards(AuthGuard)
@ApiBearerAuth()
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
    @Headers('id') id: number,
    @Body() createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.orderService.create(
      Number(id),
      createOrderRequest,
    );
    return res.status(response.status).json(response.data);
  }

  @Get('')
  @ApiOperation({ summary: '주문 조회', description: '주문을 조회합니다.' })
  @ApiResponse({ status: 200, description: '주문한 내역이 존재합니다.' })
  @ApiResponse({ status: 204, description: '주문한 내역이 없습니다.' })
  async read(@Headers('id') id: number, @Res() res: Response) {
    const response: DefaultResponseDto = await this.orderService.read(
      Number(id),
    );
    return res.status(response.status).json(response.data);
  }

  @Get('detail')
  @ApiOperation({
    summary: '주문 상세 조회',
    description: '주문을 상세하게 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '주문 상세 조회에 성공했습니다.' })
  @ApiResponse({ status: 404, description: '주문 상세 조회에 실패했습니다.' })
  async readDetail(
    @Headers('id') id: number,
    @Body() readOrderDetailRequest: ReadOrderDetailRequest,
    @Res() res: Response,
  ) {
    const response: DefaultResponseDto = await this.orderService.readDetail(
      Number(id),
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
    @Headers('id') id: number,
    @Body() createOrderCancelRequest: CreateOrderCancelRequest,
  ) {
    return this.orderService.orderCancel(Number(id), createOrderCancelRequest);
  }
}
