import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TossEntity } from '../entity/toss.entity';
import axios from 'axios';
import { requestPaymentRequest } from '../dto/request/requestPaymentRequest';
import { DefaultResponseDto } from '../dto/response/default.response';
import { PaymentRecordEntity } from '../entity/paymentRecord.entity';
import { UserEntity } from '../entity/user.entity';
import { ViewPaymentsRequest } from '../dto/request/viewPayments.request';

@Injectable()
export class TossService {
  private secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TossEntity)
    private tossEntityRepository: Repository<TossEntity>,
    @InjectRepository(PaymentRecordEntity)
    private readonly paymentRecordRepository: Repository<PaymentRecordEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {
    this.secretKey = this.configService.get<string>('TOSS_SECRET_KEY');
  }

  // 결제 승인 요청
  async paymentsConfirm(id: number, paymentInfo: requestPaymentRequest) {
    const responseDto = new DefaultResponseDto();
    const encryptedSecretKey =
      'Basic ' + Buffer.from(this.secretKey + ':').toString('base64');

    try {
      const response = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        paymentInfo,
        {
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Payments API Requested by ${id}`);
      // 필요 데이터 저장

      let tossEntity: TossEntity = new TossEntity();
      tossEntity = response.data;

      const paymentRecord: PaymentRecordEntity = new PaymentRecordEntity();

      const userEntity: UserEntity = await this.userEntityRepository.findOne({
        where: { id: id },
      });
      paymentRecord.email = userEntity.email;
      paymentRecord.amount = paymentInfo.amount;
      paymentRecord.tossEntity = tossEntity;

      this.tossEntityRepository.save(paymentRecord);

      responseDto.status = response.status;
      responseDto.data = response.data;
      return responseDto;
    } catch (e) {
      if (e.name === 'AxiosError') {
        this.logger.log(
          `TossPayment Error : ${e.response.data.code} (at ${id})`,
        );
        responseDto.status = e.response.status;
        responseDto.data = e.response.data;
        return responseDto;
      }
      throw new InternalServerErrorException('서버 관리자에게 문의하십시오.');
    }
  }

  // 결제 조회 요청
  async paymentsUser(id: number) {
    const responseDto = new DefaultResponseDto();

    try {
      const user: UserEntity = await this.userEntityRepository.findOne({
        where: { id: id },
      });

      const paymentRecordEntity: PaymentRecordEntity =
        await this.paymentRecordRepository.findOne({
          where: { email: user.email },
        });

      responseDto.data = paymentRecordEntity;
    } catch (e) {
      if (e.name === 'AxiosError') {
        this.logger.log(
          `TossPayment Error : ${e.response.data.code} (at ${id})`,
        );
        responseDto.status = e.response.status;
        responseDto.data = e.response.data;
        return responseDto;
      }
      throw new InternalServerErrorException('서버 관리자에게 문의하십시오.');
    }
  }

  // 결제 조회 요청
  async paymentsOrderId(id: number, orderId: ViewPaymentsRequest) {
    const responseDto = new DefaultResponseDto();
    const encryptedSecretKey =
      'Basic ' + Buffer.from(this.secretKey + ':').toString('base64');

    try {
      const response = await axios.post(
        'https://api.tosspayments.com//v1/payments/orders/' + orderId.id,
        {
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
        },
      );
      responseDto.status = response.status;
      responseDto.data = response.data;
    } catch (e) {
      if (e.name === 'AxiosError') {
        this.logger.log(
          `TossPayment Error : ${e.response.data.code} (at ${id})`,
        );
        responseDto.status = e.response.status;
        responseDto.data = e.response.data;
        return responseDto;
      }
      throw new InternalServerErrorException('서버 관리자에게 문의하십시오.');
    }
  }
}
