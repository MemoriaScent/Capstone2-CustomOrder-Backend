import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { CartEntity } from "../entity/cart.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CartEntity]),
  ],
  controllers: [CartController],
  providers: [CartService, Logger],
  exports: [TypeOrmModule, Logger],
})
export class CartModule {}
