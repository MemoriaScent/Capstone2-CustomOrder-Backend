import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DiffuserEntity } from './diffuser.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CustomDiffuserEntity extends DiffuserEntity {
  @ApiProperty({
    example: '1',
    description: '주문한 사용자의 id값',
  })
  @ManyToOne(() => UserEntity, (u: UserEntity) => u.id)
  @JoinColumn()
  userEntity: UserEntity;

  @ApiProperty({
    example: '키워드들',
    description: '디퓨저 정보',
  })
  @Column()
  detail: string;
}
