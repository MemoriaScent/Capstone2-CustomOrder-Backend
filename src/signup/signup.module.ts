import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SignupController],
  providers: [SignupService],
  exports: [TypeOrmModule],
})
export class SignupModule {}
