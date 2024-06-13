import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToOne } from 'typeorm';
import { TossEntity } from './toss.entity';

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
  @OneToOne(() => TossEntity, (e) => e.id)
  tossEntity: TossEntity;
}
