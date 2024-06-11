import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiffuserService } from './diffuser.service';
import { DiffuserController } from './diffuser.controller';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { CustomDeffuserEntity } from 'src/entity/customDeffuser.entity';
import { UserEntity } from 'src/entity/user.entity';
import { ReviewEntity } from 'src/entity/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiffuserEntity,
      CustomDeffuserEntity,
      UserEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [DiffuserController],
  providers: [DiffuserService],
  exports: [TypeOrmModule],
})
export class DeffuserModule {}
