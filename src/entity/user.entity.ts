import { Column, Entity, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { OrderEntity } from "./order.entity";

@Entity()
export class UserEntity extends DefaultEntity {
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
  pw: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '01012341234',
    description: '전화번호',
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: '부산광역시 부산진구 가야동 동의대학교 산학협력관 404호',
    description: '주소',
  })
  @Column()
  location: string;
}
