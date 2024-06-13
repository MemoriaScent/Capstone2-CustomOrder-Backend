import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ReviewEntity } from '../entity/review.entity';
import { DiffuserEntity } from 'src/entity/diffuser.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, ReviewEntity, DiffuserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [TypeOrmModule],
})
export class UserModule {}
