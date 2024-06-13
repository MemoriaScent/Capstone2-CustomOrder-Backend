import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '사용자 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: '사용자 비밀번호',
  })
  @IsString()
  pw: string;
}
