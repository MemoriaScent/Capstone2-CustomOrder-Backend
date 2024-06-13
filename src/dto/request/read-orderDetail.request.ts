import { ApiProperty } from '@nestjs/swagger';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: '1',
    description: '주문 번호',
  })
  orderId: number;
}
