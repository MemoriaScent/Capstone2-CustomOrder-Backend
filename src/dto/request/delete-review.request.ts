import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteReviewRequest {
  @ApiProperty({
    example: '1',
    description: '사용자 고유 번호',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  @IsString()
  diffuserId: string;
}
