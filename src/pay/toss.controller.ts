import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TossService } from './toss.service';
import { confirmPaymentRequest } from '../dto/request/confirm-payment.request';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';
import { ViewPaymentsRequest } from '../dto/request/view-payments.request';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('토스페이먼츠 API')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('toss')
export class TossController {
  constructor(
    private readonly tossService: TossService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: '결제 승인 요청',
    description: '결제를 요청합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '결제 승인 요청이 성공적으로 처리되었습니다.',
  })
  @ApiResponse({
    status: 0,
    description:
      '"https://docs.tosspayments.com/reference/error-codes#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8" 사이트 참고.',
  })
  async paymentsConfirm(
    @Headers('id') id: number,
    @Body() paymentInfo: confirmPaymentRequest,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DefaultResponseDto = await this.tossService.paymentsConfirm(
      id,
      paymentInfo,
    );

    this.logger.warn(paymentInfo);

    return res.status(result.status).json(result.data);
  }

  @Get('/user')
  @ApiOperation({
    summary: '결제 조회',
    description: '결제를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '결제 조회 요청이 성공적으로 처리되었습니다.',
  })
  @ApiResponse({
    status: 0,
    description:
      '"https://docs.tosspayments.com/reference/error-codes#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8" 사이트 참고.',
  })
  async paymentsUser(
    @Headers('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DefaultResponseDto = await this.tossService.paymentsUser(id);
    return res.status(result.status).json(result.data);
  }

  @Get('/orderId')
  @ApiOperation({
    summary: '결제 조회',
    description: '결제를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '결제 조회 요청이 성공적으로 처리되었습니다.',
  })
  @ApiResponse({
    status: 0,
    description:
      '"https://docs.tosspayments.com/reference/error-codes#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8" 사이트 참고.',
  })
  async paymentsOrderId(
    @Headers('id') id: number,
    @Body() orderId: ViewPaymentsRequest,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DefaultResponseDto = await this.tossService.paymentsOrderId(
      id,
      orderId,
    );
    return res.status(result.status).json(result.data);
  }
}
