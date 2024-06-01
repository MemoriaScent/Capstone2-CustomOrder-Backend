import { Column, Entity, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from './default.entity';
import { DeffuserEntity } from "./deffuser.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class ReviewEntity extends DefaultEntity {
    @ApiProperty({
        example: '1',
        description: '사용자 고유 번호',
    })
    @Column()
    @OneToOne(()=>UserEntity, (user:UserEntity)=>user.id)
    userId:string;

    @ApiProperty({
        example: '1',
        description: '디퓨저 고유 번호',
    })
    @Column()
    @OneToOne(()=>DeffuserEntity, (deffuser:DeffuserEntity)=>deffuser.id)
    diffuserId:string;

    @ApiProperty({
        example: '4.5',
        description: '리뷰 평점',
    })
    @Column()
    rating:number;

    @ApiProperty({
        example: '레몬 향 좋아요',
        description: '리뷰 상세 내용',
    })
    @Column()
    detail:string;
}
