import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: '1',
    description: '주문 번호',
  })
  @IsInt()
  orderId: number;
}
