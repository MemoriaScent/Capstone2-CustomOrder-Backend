import { ApiProperty } from "@nestjs/swagger";

export class AddReviewRequest{
    @ApiProperty({
        example: '1',
        description: '사용자 고유 번호',
    })
    userId:string;

    @ApiProperty({
        example: '1',
        description: '디퓨저 고유 번호',
    })
    diffuserId:string;

    @ApiProperty({
        example: '4.5',
        description: '리뷰 평점',
    })
    rating:string;

    @ApiProperty({
        example: '레몬 향 좋아요',
        description: '리뷰 상세 내용',
    })
    detail:string;
}
