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
import { ConfirmPaymentsRequest } from '../dto/request/confirmPaymentsRequest';
import { DefaultResponseDto } from '../dto/response/default.response';
import { PaymentRecordEntity } from "../entity/paymentRecord.entity";

@Injectable()
export class TossService {
  private secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TossEntity)
    private tossEntityRepository: Repository<TossEntity>,
    @InjectRepository(PaymentRecordEntity)
    private readonly paymentRecordRepository: Repository<PaymentRecordEntity>,
    private readonly logger: Logger,
  ) {
    this.secretKey = this.configService.get<string>('TOSS_SECRET_KEY');
  }

  async confirmPayment(paymentInfo: ConfirmPaymentsRequest) {
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

      this.logger.log(`Payments API Requested by ${paymentInfo.email}`);
      // 필요 데이터 저장

      let tossEntity: TossEntity = new TossEntity();
      tossEntity = response.data;

      const paymentRecord: PaymentRecordEntity = new PaymentRecordEntity();
      paymentRecord.email = paymentInfo.email;
      paymentRecord.amount = paymentInfo.amount;
      paymentRecord.tossEntity = tossEntity;

      this.tossEntityRepository.save(paymentRecord);

      responseDto.status = response.status;
      responseDto.data = response.data;
      return responseDto;
    } catch (e) {
      if (e.name === 'AxiosError') {
        this.logger.log(
          `TossPayment Error : ${e.response.data.code} (at ${paymentInfo.email})`,
        );
        responseDto.status = e.response.status;
        responseDto.data = e.response.data;
        return responseDto;
      }
      throw new InternalServerErrorException('서버 관리자에게 문의하십시오.');
    }
  }
}
