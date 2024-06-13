import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from "class-validator";
import { ReviewEntity } from "../../entity/review.entity";

export class DeleteReviewRequest {
  @ApiProperty({
    example: '1',
    description: '리뷰 고유 번호',
  })
  @IsNumber()
  reviewId: number;
}
