import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from './order.entity';
import { DiffuserEntity } from './diffuser.entity';

@Entity()
export class OrderDetailEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '디퓨저 고유번호',
  })
  @ManyToOne(() => DiffuserEntity, (d: DiffuserEntity) => d.id)
  @JoinColumn()
  diffuserId: DiffuserEntity;

  @ApiProperty({
    example: '1',
    description: '주문수량',
  })
  @Column()
  count: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
