import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';
import { OrderDetailEntity } from '../entity/orderDetail.entity';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { IdRequest } from '../dto/request/id.request';
import { CreateOrderRequest } from '../dto/request/createOrder.request';
import { DiffuserEntity } from '../entity/diffuser.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // @InjectRepository(DeffuserEntity)
    // private readonly diffuserRepository: Repository<DeffuserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
    private readonly logger: Logger,
  ) {}

  // 주문 저장
  async create(
    createOrderRequest: CreateOrderRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    try {
      // 사용자 확인
      const user = await this.userRepository.findOne({
        where: { id: createOrderRequest.userId },
      });

      if (!user) {
        response.status = 404;
        response.data = { msg: '사용자를 찾을 수 없습니다.' };
        return response;
      }
      // 주문 생성
      let order = new OrderEntity();
      order.userId = user;

      order.orderDate = new Date();

      order.price = Number(createOrderRequest.totalPrice); // 총 가격 설정

      order.orderPrice = Number(createOrderRequest.totalPrice) + 3000; // 배송비 포함 총 가격 설정

      order.status = '결제 완료';
      order.categoryAmount = createOrderRequest.orderItems.length; // 주문 아이템 수량 설정

      order = await this.orderRepository.save(order);

      // 주문 상세 정보 생성
      for (const orderItemData of createOrderRequest.orderItems) {
        const orderDetailEntity = new OrderDetailEntity(); //저장할 데이터
        const deffuserEntity: DiffuserEntity = new DiffuserEntity(); //디퓨저 번호 기재용
        deffuserEntity.id = orderItemData.diffuserId;
        orderDetailEntity.count = orderItemData.diffuserAmount;
        orderDetailEntity.diffuserId = deffuserEntity;
        orderDetailEntity.order = order; // 주문과의 관계 설정
        this.orderDetailRepository.save(orderDetailEntity);
      }

      response.status = 200;
    } catch (error) {
      response.status = 500;
      response.data = { msg: '주문을 저장하는 동안 오류가 발생했습니다.' };
    }

    return response;
  }

  // 주문 조회
  async read(idRequest: IdRequest): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    const result = await this.orderRepository.find({
      relations: {
        userId: true,
      },
      where: {
        userId: {
          id: idRequest.userId,
        },
      },
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

    // 주문자 정보 추가하여 res 필요 =====

    if (!result) {
      response.status = 204;
      response.data = { msg: '주문한 상세 내역이 없습니다.' };
    } else if (readOrderDetailRequest.userId != result.userId.id) {
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
