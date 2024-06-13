import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';
import { DiffuserEntity } from './diffuser.entity';

@Entity()
export class ReviewEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '사용자 고유 번호',
  })
  @ManyToOne(() => UserEntity, (u: UserEntity) => u.id)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  @ManyToOne(() => DiffuserEntity, (d: DiffuserEntity) => d.id)
  @JoinColumn()
  diffuser: DiffuserEntity;

  @ApiProperty({
    example: '4.5',
    description: '리뷰 평점',
  })
  @Column()
  rating: number;

  @ApiProperty({
    example: '레몬 향 좋아요',
    description: '리뷰 상세 내용',
  })
  @Column()
  detail: string;
}
