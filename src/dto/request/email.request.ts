import { ApiProperty } from '@nestjs/swagger';

export class EmailRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일',
  })
  email: string;
}
