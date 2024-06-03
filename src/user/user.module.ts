import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ReviewEntity } from '../entity/review.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, ReviewEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [TypeOrmModule],
})
export class UserModule {}
