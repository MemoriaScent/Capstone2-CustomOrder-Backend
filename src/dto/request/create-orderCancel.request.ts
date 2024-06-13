import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOrderCancelRequest {
  @ApiProperty({
    example: '1',
    description: '주문 번호',
  })
  @IsInt()
  orderId: number;

  @ApiProperty({
    example: '단순 변심',
    description: '취소 유형',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '취소하고 싶습니다.',
    description: '취소 내용',
  })
  @IsString()
  content: string;
}
