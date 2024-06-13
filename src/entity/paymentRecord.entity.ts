import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { TossEntity } from './toss.entity';

@Entity()
export class PaymentRecordEntity extends DefaultEntity {
  @ApiProperty({
    example: '000001',
    description: '사용자 이메일',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '70000',
    description: '결제 금액',
  })
  @Column('decimal')
  amount: number;

  @ApiProperty()
  @OneToOne(() => TossEntity, (e: TossEntity) => e.id)
  @JoinColumn()
  tossEntity: TossEntity;
}
