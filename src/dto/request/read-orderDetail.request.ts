import { ApiProperty } from '@nestjs/swagger';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: '1',
    description: '사용자 번호',
  })
  userId: number;

  @ApiProperty({
    example: '1',
    description: '주문 상세 번호',
  })
  orderDetailId: number;
}
