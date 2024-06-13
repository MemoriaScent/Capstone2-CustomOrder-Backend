import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from "class-validator";

export class CreateOrderDetailRequest {
  @ApiProperty({
    example: 1,
    description: '디퓨저 고유번호',
  })
  @IsInt()
  diffuserId: number;

  @ApiProperty({
    example: 1,
    description: '디퓨저 개수',
  })
  @IsInt()
  diffuserAmount: number;
}

export class CreateOrderRequest {
  @ApiProperty({
    example: 'QWERTY',
    description: '주문 번호',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    example: 55000,
    description: '주문 총 가격',
  })
  @IsInt()
  totalPrice: number;

  @ApiProperty({
    type: [CreateOrderDetailRequest],
    description: '주문 상세 정보',
  })
  orderItems: CreateOrderDetailRequest[];
}
