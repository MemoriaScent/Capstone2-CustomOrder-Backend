import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly logger: Logger,
  ) {}

  async read(email: string): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const result = await this.orderRepository.findOne({
      where: { userEmail: email },
    });

    // const result = this.orderRepository
    //   .createQueryBuilder('order')
    //   .where('order.userId = :uid', { uid: uid })
    //   .getMany(); // 다수의 결과값을 가져오는 경우


    //const result = await this.orderRepository.findOne({
    //  where: { userId: userResult },
    //});

    this.logger.error(result);
    response.status = result ? 200 : 404;
    response.data = result ? result : { msg: '주문한 내역이 없습니다.' };
    return response;
  }
}
