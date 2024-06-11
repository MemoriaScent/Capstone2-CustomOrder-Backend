// 주문 취소
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderCancelEntity extends DefaultEntity {
  @ApiProperty({
    example: '1 ',
    description: '주문 고유 번호',
  })
  @OneToOne(() => OrderEntity, (o: OrderEntity) => o.id)
  @JoinColumn()
  orderId: OrderEntity;

  @ApiProperty({
    example: '단순 변심',
    description: '취소 유형',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: '그냥요.',
    description: '내용',
  })
  @Column()
  content: string;
}
