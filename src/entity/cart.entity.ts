// 장바구니 엔티티
import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';
import { DeffuserEntity } from './deffuser.entity';

@Entity()
export class CartEntity extends DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '장바구니에 담은 사용자의 id값',
  })
  @Column()
  @OneToMany(() => UserEntity, (u: UserEntity) => u.email)
  userEmail: string;

  @ApiProperty({
    example: '1',
    description: '장바구니에 담은 사용자의 id값',
  })
  @Column()
  @OneToMany(() => DeffuserEntity, (d: DeffuserEntity) => d.id)
  diffuserId: number;

  @ApiProperty({
    example: '3',
    description: '주문 수량',
  })
  @Column()
  count: number;
}
