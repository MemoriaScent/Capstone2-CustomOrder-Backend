import { ApiProperty } from '@nestjs/swagger';

export class AddCustomDeffuserRequest{
  @ApiProperty({
    example: '레몬그라스',
    description: '디퓨저 이름',
  })
  Name: string;

  @ApiProperty({
    example: 'https://www.google.com/search?',
    description: '디퓨저 이미지 url',
  })
  Image: string;
  
  @ApiProperty({
    example: '20000',
    description: '디퓨저 가격',
  })
  Price: number;

  @ApiProperty({
    example: '1',
    description: '주문한 사용자의 id값',
  })
  userEmail: string;

@ApiProperty({
    example: '키워드들',
    description: '디퓨저 정보',
  })
  detail: string;

}