import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';

@Entity()
export class OrderEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '주문한 사용자의 id값',
  })
  @Column()
  @OneToMany(() => UserEntity, (u: UserEntity) => u.email)
  userEmail: string;

  @ApiProperty({
    example: '2024-01-01',
    description: '주문 날짜',
  })
  @Column()
  orderDate: Date;

  @ApiProperty({
    example: '55000',
    description: '할인 후 금액',
  })
  @Column()
  price: number;

  @ApiProperty({
    example: '77000',
    description: '배송비 포함 금액',
  })
  @Column()
  orderPrice: number;

  @ApiProperty({
    example: '배송 완료',
    description: '주문 진행 상황',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: '3',
    description: '주문 수량',
  })
  @Column()
  count: number;
}
