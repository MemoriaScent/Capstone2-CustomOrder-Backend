import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString } from 'class-validator';
import { UserEntity } from '../../entity/user.entity';

export class CreateUserRequest extends UserEntity {
  @ApiProperty({
    example: '12345678',
    description: '비밀번호 재확인',
  })
  @IsString()
  pwCheck: string;
}
