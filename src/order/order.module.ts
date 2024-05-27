import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UserEntity } from "../entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService, Logger],
  exports: [TypeOrmModule, Logger],
})
export class OrderModule {}
