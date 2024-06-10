import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './entity/order.entity';
import { OrderDetailEntity } from './entity/orderDetail.entity';
import { DeffuserEntity } from './entity/deffuser.entity';
import { ReviewEntity } from './entity/review.entity';
import { DeffuserModule } from './deffuser/deffuser.module';
import { CustomDeffuserEntity } from './entity/customDeffuser.entity';
import { CartEntity } from './entity/cart.entity';
import { CartModule } from './cart/cart.module';

//import process from 'process';

@Module({
  imports: [
    UserModule,
    AuthModule,
    OrderModule,
    DeffuserModule,
    OrderDetailEntity,
    DeffuserEntity,
    CustomDeffuserEntity,
    ReviewEntity,
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        OrderEntity,
        DeffuserEntity,
        CustomDeffuserEntity,
        ReviewEntity,
        CartEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {}
