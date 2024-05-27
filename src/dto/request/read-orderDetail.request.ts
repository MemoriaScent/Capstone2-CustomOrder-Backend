import { ApiProperty } from '@nestjs/swagger';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: '1',
    description: '주문 상세 번호',
  })
  orderDetailId: number;
}
