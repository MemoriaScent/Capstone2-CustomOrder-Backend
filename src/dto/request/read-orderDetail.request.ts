import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: 'QWERTY',
    description: '주문 번호',
  })
  @IsString()
  orderId: string;
}
