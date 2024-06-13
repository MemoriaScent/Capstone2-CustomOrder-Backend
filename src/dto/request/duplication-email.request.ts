import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DuplicationEmailRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일',
  })
  @IsString()
  email: string;
}
