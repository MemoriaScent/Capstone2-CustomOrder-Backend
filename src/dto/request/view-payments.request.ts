import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ViewPaymentsRequest {
  @ApiProperty({
    example: 'MC41NTI5ODE3MTI1MTE4',
    description: '주문번호',
  })
  @IsString()
  id: string;
}
