import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';
import { OrderDetailEntity } from "../entity/orderDetail.entity";
import { ReadOrderDetailRequest } from "../dto/request/read-orderDetail.request";
import { CreateOrderCancelRequest } from "../dto/request/create-orderCancel.request";
import { CreateUserRequest } from "../dto/request/create-user.request";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
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

  // 주문 상세 페이지
  async readDetail(readOrderDetailRequest: ReadOrderDetailRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    // 주문 상세 번호로 조회
    const result = await this.orderDetailRepository.findOne({
      where: { id: readOrderDetailRequest.orderDetailId },
    });

    this.logger.error(result);
    response.status = result ? 200 : 404;
    response.data = result ? result : { msg: '주문한 상세 내역이 없습니다.' };
    return response;
  }

  async orderCancel(createOrderCancelRequest: CreateOrderCancelRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    // 주문 취소 테이블 작성 후 코드 작성
    const result: 주문 취소 테이블 = await this.userRepository.save(createOrderCancelRequest);

    this.logger.error(result);
    response.status = result ? 200 : 404;
    response.data = result ? result : { msg: '주문한 상세 내역이 없습니다.' };
    return response;
  }
}
