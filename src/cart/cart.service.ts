import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { EmailRequest } from '../dto/request/email.request';
import { CartEntity } from '../entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly logger: Logger,
  ) {}

  // 장바구니 페이지 불러오기
  async read(emailRequest: EmailRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const result = await this.cartRepository.find({
      where: { userEmail: emailRequest.email },
    });

    if (result && result.length > 0) {
      response.status = 200;
      response.data = result;
    } else {
      response.status = 400;
      response.data = { msg: '장바구니에 담은 내역이 없습니다.' };
    }
    return response;
  }
}
