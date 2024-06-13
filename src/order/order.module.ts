import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UserEntity } from '../entity/user.entity';
import { OrderDetailEntity } from '../entity/orderDetail.entity';
import { OrderCancelEntity } from '../entity/orderCancel.entity';
import { DiffuserEntity } from '../entity/diffuser.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      OrderDetailEntity,
      OrderCancelEntity,
      DiffuserEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, Logger, JwtService],
  exports: [TypeOrmModule, Logger],
})
export class OrderModule {}
