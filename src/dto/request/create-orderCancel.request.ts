import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderCancelRequest {
  @ApiProperty({
    example: '1',
    description: '주문 번호',
  })
  orderId: number;

  @ApiProperty({
    example: '단순 변심',
    description: '취소 유형',
  })
  title: string;

  @ApiProperty({
    example: '취소하고 싶습니다.',
    description: '취소 내용',
  })
  content: string;
}
