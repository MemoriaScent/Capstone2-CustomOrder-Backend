import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailRequest {
  @ApiProperty({
    example: 1,
    description: '디퓨저 고유번호',
  })
  diffuserId: number;

  @ApiProperty({
    example: 1,
    description: '디퓨저 개수',
  })
  diffuserAmount: number;
}

export class CreateOrderRequest {
  @ApiProperty({
    example: '1',
    description: '사용자 번호',
  })
  userId: number;

  @ApiProperty({
    example: 55000,
    description: '주문 총 가격',
  })
  totalPrice: number;

  @ApiProperty({
    type: [CreateOrderDetailRequest],
    description: '주문 상세 정보',
  })
  orderItems: CreateOrderDetailRequest[];
}