import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateCartRequest {
  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  @IsInt()
  diffuserId: number;

  @ApiProperty({
    example: '3',
    description: '수량',
  })
  @IsInt()
  quantity: number;
}
