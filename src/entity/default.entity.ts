import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DefaultEntity {
  @ApiProperty({
    example: '1',
    description: '기본값 인덱스',
  })
  @PrimaryGeneratedColumn()
  id: number;
}
