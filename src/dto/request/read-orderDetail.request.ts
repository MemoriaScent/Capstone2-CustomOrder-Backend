import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadOrderDetailRequest {
  @ApiProperty({
    example: 'MC41NTI5ODE3MTI1MTE4',
    description: '주문 번호',
  })
  @IsString()
  orderId: string;
}
