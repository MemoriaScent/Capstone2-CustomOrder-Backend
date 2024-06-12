import { ApiProperty } from '@nestjs/swagger';

export class TokenRequest {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzRAbWVtb3JpYS5rciIsInN1YiI6MTEsImlhdCI6MTcxODE4NzkwMCwiZXhwIjoxNzE4MTg4MjAwfQ.ihrN4ikKMKjO7ejDnkp-Nda5tqBaeHUl7pVQ9TUDpWQ',
    description: '사용자 token 값',
  })
  token: string;
}
