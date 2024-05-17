import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async read(uid: number): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    const result: OrderEntity = await this.orderRepository.findOneById(uid);
    response.status = result ? 200 : 404;
    response.data = result ? result : { msg: '오류' };
    return response;
  }
}
