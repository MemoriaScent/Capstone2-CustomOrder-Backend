import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
export class UserEntity {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '로그인 메일',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
  })
  @Column()
  password: string;
}
