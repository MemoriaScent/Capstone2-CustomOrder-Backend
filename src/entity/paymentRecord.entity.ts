import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { TossEntity } from './toss.entity';
import { UserEntity } from './user.entity';

@Entity()
export class PaymentRecordEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '사용자 고유번호',
  })
  @ManyToOne(() => UserEntity, (u: UserEntity) => u.id)
  @JoinColumn()
  userEntity: UserEntity;

  @ApiProperty()
  @OneToOne(() => TossEntity, (e: TossEntity) => e.id)
  @JoinColumn()
  tossEntity: TossEntity;
}
