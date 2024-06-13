import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ViewPaymentsRequest {
  @ApiProperty({
    example: 'QWERTY',
    description: '주문번호',
  })
  @IsString()
  id: string;
}
