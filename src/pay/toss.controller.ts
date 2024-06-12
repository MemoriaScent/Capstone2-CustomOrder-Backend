import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Ip, Logger, Post, Res } from '@nestjs/common';
import { TossService } from './toss.service';
import { ConfirmPaymentsRequest } from '../dto/request/confirmPaymentsRequest';
import { Response } from 'express';
import { DefaultResponseDto } from '../dto/response/default.response';

@ApiTags('토스페이먼츠 API')
@Controller('toss')
export class TossController {
  constructor(
    private readonly tossService: TossService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: '결제 승인',
    description: '주문을 생성합니다.',
  })
  @ApiResponse({ status: 200, description: '결제 승인 요청이 성공적으로 처리되었습니다.' })
  @ApiResponse({ status: 0, description: '"https://docs.tosspayments.com/reference/error-codes#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8" 사이트 참고.' })
  async confirmPayment(
    @Body() paymentInfo: ConfirmPaymentsRequest,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DefaultResponseDto =
      await this.tossService.confirmPayment(paymentInfo);
    return res.status(result.status).json(result.data);
  }
}
