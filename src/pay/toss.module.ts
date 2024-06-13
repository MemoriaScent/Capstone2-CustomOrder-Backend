import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TossController } from './toss.controller';
import { TossEntity } from '../entity/toss.entity';
import { TossService } from './toss.service';
import { PaymentRecordEntity } from '../entity/paymentRecord.entity';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TossEntity, PaymentRecordEntity, UserEntity]),
  ],
  providers: [TossService, Logger, JwtService],
  controllers: [TossController],
  exports: [Logger],
})
export class TossModule {}
