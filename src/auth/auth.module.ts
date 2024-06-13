import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { ReviewEntity } from '../entity/review.entity';
import { DiffuserEntity } from '../entity/diffuser.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, ReviewEntity, DiffuserEntity]),
  ],
  providers: [AuthService, UserService, JwtService, Logger],
  controllers: [AuthController],
  exports: [Logger],
})
export class AuthModule {}
