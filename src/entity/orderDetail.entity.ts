import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { DeffuserEntity } from './deffuser.entity';

@Entity()
export class OrderDetailEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '디퓨저 고유번호',
  })
  @Column()
  @OneToMany(() => DeffuserEntity, (d: DeffuserEntity) => d.id)
  diffuserId: number;

  @ApiProperty({
    example: '1',
    description: '주문 고유번호',
  })
  @Column()
  @OneToMany(() => OrderEntity, (o: OrderEntity) => o.id)
  orderId: number;

  @ApiProperty({
    example: '10000',
    description: '가격',
  })
  @Column()
  orderPrice: number;

  @ApiProperty({
    example: '1',
    description: '주문수량',
  })
  @Column()
  count: number;
}
