import { ApiProperty } from '@nestjs/swagger';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일로 대체, 토큰 복호화 구현 후 변경',
  })
  email: string;

  @ApiProperty({
    example: '1',
    description: '주문 상세 번호',
  })
  orderDetailId: number;
}
