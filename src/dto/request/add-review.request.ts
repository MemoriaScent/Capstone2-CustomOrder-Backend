import { ApiProperty } from '@nestjs/swagger';

export class AddReviewRequest {
  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  diffuserId: number;

  @ApiProperty({
    example: '4.5',
    description: '리뷰 평점',
  })
  rating: number;

  @ApiProperty({
    example: '레몬 향 좋아요',
    description: '리뷰 상세 내용',
  })
  detail: string;
}
