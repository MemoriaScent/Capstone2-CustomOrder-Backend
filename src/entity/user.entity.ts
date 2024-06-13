import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

@Entity()
export class UserEntity extends DefaultEntity {
  @ApiProperty({
    example: '1234@memoria.kr',
    description: '로그인 메일',
  })
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
  })
  @Column()
  @IsString()
  pw: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    example: '01012341234',
    description: '전화번호',
  })
  @Column()
  @IsNumberString()
  phone: string;

  @ApiProperty({
    example: '부산광역시 부산진구 가야동 동의대학교 산학협력관 404호',
    description: '주소',
  })
  @Column()
  @IsString()
  location: string;
}
