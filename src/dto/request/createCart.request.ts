import { ApiProperty } from '@nestjs/swagger';

export class CreateCartRequest {
  @ApiProperty({
    example: '1',
    description: '사용자 고유 번호',
  })
  userId: number;

  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  diffuserId: number;

  @ApiProperty({
    example: '3',
    description: '수량',
  })
  quantity: number;
}
