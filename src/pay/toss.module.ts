import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TossController } from './toss.controller';
import { TossEntity } from '../entity/toss.entity';
import { TossService } from './toss.service';
import { PaymentRecordEntity } from '../entity/paymentRecord.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TossEntity, PaymentRecordEntity]),
  ],
  providers: [TossService, Logger],
  controllers: [TossController],
  exports: [Logger],
})
export class TossModule {}
