import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { ReviewEntity } from "../entity/review.entity";

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserEntity, ReviewEntity])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
