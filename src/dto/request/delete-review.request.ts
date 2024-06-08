import { ApiProperty } from "@nestjs/swagger";

export class DeleteReviewRequest{
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
}
