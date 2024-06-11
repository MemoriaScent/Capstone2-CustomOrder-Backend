import { ApiProperty } from '@nestjs/swagger';

export class IdRequest {
  @ApiProperty({
    example: '1',
    description: '사용자 번호',
  })
  userId: number;
}

