import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';

@Entity()
export class ReviewEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '사용자 고유 번호',
  })
  @Column()
  userId: string;

  @ApiProperty({
    example: '1',
    description: '디퓨저 고유 번호',
  })
  @Column()
  diffuserId: string;

  @ApiProperty({
    example: '4.5',
    description: '리뷰 평점',
  })
  @Column()
  rating: string;

  @ApiProperty({
    example: '레몬 향 좋아요',
    description: '리뷰 상세 내용',
  })
  @Column()
  detail: string;
}
