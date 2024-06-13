import { Repository } from 'typeorm';
import { Body, Injectable, Logger, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { IdRequest } from '../dto/request/id.request';
import { CartEntity } from '../entity/cart.entity';
import { CreateCartRequest } from '../dto/request/createCart.request';
import { Response } from 'express';
import { UserEntity } from '../entity/user.entity';
import { DiffuserEntity } from '../entity/diffuser.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DiffuserEntity)
    private readonly diffuserRepository: Repository<DiffuserEntity>,
    private readonly logger: Logger,
  ) {}

  async create(id: number, createCartRequest: CreateCartRequest) {
    const response: DefaultResponseDto = new DefaultResponseDto();

    // 사용자와 디퓨저를 데이터베이스에서 찾기
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    const diffuser = await this.diffuserRepository.findOne({
      where: { id: +createCartRequest.diffuserId },
    });

    if (!user || !diffuser) {
      response.status = 404;
      response.data = { msg: '사용자 또는 디퓨저를 찾을 수 없습니다.' };
      return response;
    }

    // 사용자의 장바구니 항목을 찾기
    let cartItem = await this.cartRepository.findOne({
      where: { user: user, diffuserId: diffuser },
    });

    if (cartItem) {
      // 항목이 이미 있으면 수량 업데이트
      cartItem.quantity += Number(createCartRequest.quantity);
    } else {
      // 새로운 장바구니 항목 생성
      cartItem = this.cartRepository.create({
        user: user,
        diffuserId: diffuser,
        price: diffuser.Price,
        quantity: Number(createCartRequest.quantity),
      });
    }

    await this.cartRepository.save(cartItem);

    response.status = 201;
    response.data = cartItem;
    return response;
  }

  // 장바구니 페이지 불러오기
  async read(id: number): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const userE = await this.userRepository.find({
      where: { id: id },
    });
    this.logger.warn(userE);

    if (userE.length == 0) {
      response.status = 404;
      response.data = { msg: '해당 사용자가 없습니다.' };
      return response;
    }

    const result = await this.cartRepository.find({
      where: { user: userE },
    });

    if (result && result.length > 0) {
      response.status = 200;
      response.data = { user: userE, diffuser: result };
    } else {
      response.status = 200;
      response.data = { msg: '장바구니에 담은 내역이 없습니다.' };
    }
    return response;
  }
}
