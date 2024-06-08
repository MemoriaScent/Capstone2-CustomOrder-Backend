import { Entity,Column,OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { DeffuserEntity } from "./deffuser.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CustomDeffuserEntity extends DeffuserEntity {
    @ApiProperty({
        example: '1',
        description: '주문한 사용자의 id값',
      })
      @Column()
      //@OneToMany(() => UserEntity, (u: UserEntity) => u.email)
      userEmail: string;

    @ApiProperty({
        example: '키워드들',
        description: '디퓨저 정보',
      })
      @Column()
      detail: string;
}