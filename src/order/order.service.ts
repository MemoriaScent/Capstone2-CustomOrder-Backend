import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from '../dto/response/default.response';
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';
import { OrderDetailEntity } from '../entity/orderDetail.entity';
import { ReadOrderDetailRequest } from '../dto/request/read-orderDetail.request';
import { CreateOrderCancelRequest } from '../dto/request/create-orderCancel.request';
import { CreateOrderRequest } from '../dto/request/createOrder.request';
import { DiffuserEntity } from '../entity/diffuser.entity';
import { OrderCancelEntity } from '../entity/orderCancel.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
    @InjectRepository(OrderCancelEntity)
    private readonly orderCancelEntityRepository: Repository<OrderCancelEntity>,
    @InjectRepository(DiffuserEntity)
    private readonly diffuserRepository: Repository<DiffuserEntity>,
    private readonly logger: Logger,
  ) {}

  // 주문 저장
  async create(
    id: number,
    createOrderRequest: CreateOrderRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();
    try {
      // 사용자 확인
      const user = await this.userRepository.findOne({
        where: { id: id },
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
        const diffuserEntity: DiffuserEntity = new DiffuserEntity(); //디퓨저 번호 기재용
        diffuserEntity.id = orderItemData.diffuserId;

        const orderDetailEntity = new OrderDetailEntity(); //저장할 데이터
        orderDetailEntity.diffuserId = diffuserEntity;
        orderDetailEntity.count = orderItemData.diffuserAmount;
        orderDetailEntity.order = order; // 주문과의 관계 설정
        this.logger.debug(orderDetailEntity.diffuserId.id);
        await this.orderDetailRepository.save(orderDetailEntity);
      }
      response.status = 201;
    } catch (error) {
      this.logger.warn(error);
      response.status = 500;
      response.data = { msg: '주문을 저장하는 동안 오류가 발생했습니다.' };
    }

    return response;
  }

  // 주문 조회
  async read(id: number): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const result = await this.orderRepository.find({
      relations: {
        userId: true,
      },
      where: {
        userId: {
          id: id,
        },
      },
    });

    if (result && result.length > 0) {
      response.status = 200;
      response.data = result;
    } else {
      response.status = 204;
    }
    return response;
  }

  // 주문 상세 조회
  async readDetail(
    id: number,
    readOrderDetailRequest: ReadOrderDetailRequest,
  ): Promise<DefaultResponseDto> {
    const response: DefaultResponseDto = new DefaultResponseDto();

    const result = await this.orderDetailRepository.find({
      relations: {
        order: true,
        diffuserId: true,
      },
      where: {
        order: {
          id: readOrderDetailRequest.orderId,
        },
      },
    });

    if (result.length == 0) {
      response.status = 404;
      response.data = { msg: '주문 번호가 잘못되었습니다.' };
    } else {
      response.status = 200;
      response.data = result;
    }
    return response;
  }

  async orderCancel(
    id: number,
    createOrderCancelRequest: CreateOrderCancelRequest,
  ): Promise<number> {
    const orderEntity = new OrderEntity();
    orderEntity.id = createOrderCancelRequest.orderId;

    const orderCancelEntity = new OrderCancelEntity();
    orderCancelEntity.orderId = orderEntity;
    orderCancelEntity.title = createOrderCancelRequest.title;
    orderCancelEntity.content = createOrderCancelRequest.content;

    try {
      await this.orderCancelEntityRepository.save(orderCancelEntity);
    } catch (e) {
      this.logger.warn(e);
      throw new InternalServerErrorException('서버가 오류 났습니다.');
    }
    return;
  }
}
