import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Url } from "url";
import { DefaultEntity } from './default.entity';

@Entity()
export class DeffuserEntity extends DefaultEntity {

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
