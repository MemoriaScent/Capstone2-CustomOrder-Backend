import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { CartEntity } from '../entity/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DiffuserEntity } from '../entity/diffuser.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DiffuserEntity, CartEntity])],
  controllers: [CartController],
  providers: [CartService, Logger, JwtService],
  exports: [TypeOrmModule, Logger],
})
export class CartModule {}
