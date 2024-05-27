import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Url } from "url";

@Entity()
export class DeffuserEntity {
  @ApiProperty({
    example: '1',
    description: '기본값 인덱스',
  })
  @PrimaryGeneratedColumn()
  Diffuserid: number;

  @ApiProperty({
    example: '레몬그라스',
    description: '디퓨저 이름',
  })
  @Column()
  Name: string;

  @ApiProperty({
    example: 'https://www.google.com/search?',
    description: '디퓨저 이미지 url',
  })
  @Column()
  Image: Url;
  
  @ApiProperty({
    example: '20000',
    description: '디퓨저 가격',
  })
  @Column()
  Price: number;

}
