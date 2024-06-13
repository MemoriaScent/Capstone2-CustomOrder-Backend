import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateUserRequest {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
  })
  @IsString()
  pw: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호 재확인',
  })
  @IsString()
  pwCheck: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '01012341234',
    description: '전화번호',
  })
  @IsNumberString()
  phone: string;

  @ApiProperty({
    example: '부산광역시 부산진구 가야동 동의대학교 산학협력관 404호',
    description: '주소',
  })
  @IsString()
  location: string;
}
