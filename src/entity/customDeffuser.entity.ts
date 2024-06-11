import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DiffuserEntity } from './diffuser.entity';

@Entity()
export class CustomDeffuserEntity extends DiffuserEntity {
  @ApiProperty({
    example: '1',
    description: '주문한 사용자의 id값',
  })
  @Column()
  //@OneToMany(() => UserEntity, (u: UserEntity) => u.email)
  userEmail: string;

  @ApiProperty({
    example: '키워드들',
    description: '디퓨저 정보',
  })
  @Column()
  detail: string;
}
