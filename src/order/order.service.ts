import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';
import { OrderDetailEntity } from '../entity/orderDetail.entity';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { EmailRequest } from '../dto/request/email.request';

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

  // 주문 페이지
  async read(emailRequest: EmailRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const result = await this.orderRepository.find({
      where: { userEmail: emailRequest.email },
    });

    this.logger.error(result);
    if (result && result.length > 0) {
      response.status = 200;
      response.data = result;
    } else {
      response.status = 400;
      response.data = { msg: '주문한 내역이 없습니다.' };
    }
    return response;
  }

  // 주문 상세 페이지
  async readDetail(
    readOrderDetailRequest: ReadOrderDetailRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    // 주문 상세 번호로 조회
    const result = await this.orderRepository.findOne({
      where: { id: readOrderDetailRequest.orderDetailId },
    });

    if (!result) {
      response.status = 204;
      response.data = { msg: '주문한 상세 내역이 없습니다.' };
    } else if (readOrderDetailRequest.email != result.userEmail) {
      response.status = 403;
      response.data = { msg: '해당 내역을 주문한 회원이 아닙니다.' };
    } else {
      response.status = 200;
      response.data = result;
    }
    return response;
  }

  async orderCancel(
    createOrderCancelRequest: CreateOrderCancelRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    //
    //   // 주문 취소 테이블 작성 후 코드 작성
    //   const result: 주문 취소 테이블 = await this.userRepository.save(createOrderCancelRequest);
    //
    //   this.logger.error(result);
    //   response.status = result ? 200 : 404;
    //   response.data = result ? result : { msg: '주문한 상세 내역이 없습니다.' };
    return response;
  }
}
