// 장바구니 엔티티
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';
import { DiffuserEntity } from './diffuser.entity';

@Entity()
export class CartEntity extends DefaultEntity {
  @ManyToOne(() => DiffuserEntity, (diffuser: DiffuserEntity) => diffuser.id)
  @JoinColumn()
  diffuserId: DiffuserEntity;

  @ApiProperty({
    example: '12000',
    description: '가격',
  })
  @Column()
  price: number;

  @ApiProperty({
    example: '3',
    description: '주문 수량',
  })
  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
