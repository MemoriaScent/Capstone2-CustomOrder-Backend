import { ApiProperty } from '@nestjs/swagger';

export class CreateCartRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  diffuserId: number;

  @ApiProperty({
    example: '수량',
    description: '1',
  })
  quantity: number;
}
