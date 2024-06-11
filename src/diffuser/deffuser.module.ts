import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeffuserService } from './deffuser.service';
import { DeffuserController } from './deffuser.controller';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { CustomDeffuserEntity } from 'src/entity/customDeffuser.entity';
import { UserEntity } from 'src/entity/user.entity';
import { ReviewEntity } from 'src/entity/review.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiffuserEntity,CustomDeffuserEntity,UserEntity,ReviewEntity])],
  controllers: [DeffuserController],
  providers: [DeffuserService],
  exports: [TypeOrmModule],
})
export class DeffuserModule {}
