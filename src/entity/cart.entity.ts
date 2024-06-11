// 장바구니 엔티티
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';
import { DeffuserEntity } from './deffuser.entity';

@Entity()
export class CartEntity extends DefaultEntity {
  @ManyToOne(() => DeffuserEntity, (diffuser) => diffuser.id)
  diffuserId: DeffuserEntity;

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

  @ManyToOne(() => UserEntity, (user) => user.carts)
  user: UserEntity;
}
