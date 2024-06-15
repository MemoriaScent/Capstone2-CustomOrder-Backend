import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class requestPaymentRequest {
  @ApiProperty({
    example: 'MC41NTI5ODE3MTI1MTE4',
    description: '주문 번호',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    example: 'NORMAL',
    description:
      '결제 타입 정보. "NORMAL(일반결제)", "BILLING(자동결제)", "BRANDPAY(브랜드페이)" 중 하나.',
  })
  @IsString()
  paymentType: string;

  @ApiProperty({
    example: 'tgen_20240614024117t7cV9',
    description: '결제 키 값. 최대 200자. 결제 식별 역할. 고유 값.',
  })
  @IsString()
  paymentKey: string;

  @ApiProperty({
    example: '70000',
    description: '결제 금액',
  })
  @IsInt()
  amount: number;
}
