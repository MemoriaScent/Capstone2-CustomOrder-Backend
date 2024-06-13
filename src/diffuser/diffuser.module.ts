import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiffuserService } from './diffuser.service';
import { DiffuserController } from './diffuser.controller';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { CustomDiffuserEntity } from 'src/entity/customDiffuserEntity';
import { UserEntity } from 'src/entity/user.entity';
import { ReviewEntity } from 'src/entity/review.entity';
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiffuserEntity,
      CustomDiffuserEntity,
      UserEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [DiffuserController],
  providers: [DiffuserService, Logger, JwtService],
  exports: [TypeOrmModule, Logger],
})
export class DiffuserModule {}
