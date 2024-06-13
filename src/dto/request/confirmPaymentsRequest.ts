import { ApiProperty } from '@nestjs/swagger';
import { Headers } from "@nestjs/common";

export class ConfirmPaymentsRequest {
  @ApiProperty({
    example: '000001',
    description: '주문 번호',
  })
  orderId: string;

  @ApiProperty({
    example: 'NORMAL',
    description: '결제 타입 정보. "NORMAL(일반결제)", "BILLING(자동결제)", "BRANDPAY(브랜드페이)" 중 하나.',
  })
  paymentType: string;

  @ApiProperty({
    example: 'qwertyuiop',
    description: '결제 키 값. 최대 200자. 결제 식별 역할. 고유 값.',
  })
  paymentKey: string;

  @ApiProperty({
    example: '70000',
    description: '결제 금액',
  })
  amount: number;
}
