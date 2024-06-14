import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TossEntity extends DefaultEntity {
  @ApiProperty({
    example: '000001',
    description:
      'Payment 객체의 응답 버전입니다. 버전 2022-06-08부터 날짜 기반 버저닝을 사용합니다.',
  })
  @Column()
  version: string;

  @ApiProperty({
    example: 'qwertyuiop',
    description:
      '결제의 키 값입니다. 최대 길이는 200자입니다. 결제를 식별하는 역할로, 중복되지 않는 고유한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 결제 상태가 변해도 값이 유지됩니다. 결제 승인, 결제 조회, 결제 취소 API에 사용합니다.',
  })
  @Column()
  paymentKey: string;

  @ApiProperty({
    example: 'NORMAL',
    description:
      '결제 타입 정보입니다. NORMAL(일반결제), BILLING(자동결제), BRANDPAY(브랜드페이) 중 하나입니다.',
  })
  @Column()
  type: string;

  @ApiProperty({
    example: '000001',
    description:
      '주문번호입니다. 최소 길이는 6자, 최대 길이는 64자입니다. 주문한 결제를 식별하는 역할로, 결제를 요청할 때 가맹점에서 만들어서 사용한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 중복되지 않는 고유한 값을 발급해야 합니다. 결제 상태가 변해도 값이 유지됩니다.',
  })
  @Column()
  orderId: string;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '구매상품입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다.',
  })
  @Column()
  orderName: string;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '상점아이디(MID)입니다. 토스페이먼츠에서 발급합니다. 최대 길이는 14자입니다.',
  })
  @Column()
  mId: string;

  @ApiProperty({
    example: '생수 외 1건',
    description: '결제할 때 사용한 통화입니다.',
  })
  @Column()
  currency: string;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '결제수단입니다. 카드, 가상계좌, 간편결제, 휴대폰, 계좌이체, 문화상품권, 도서문화상품권, 게임문화상품권 중 하나입니다.',
  })
  @Column()
  method: string;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '총 결제 금액입니다. 결제가 취소되는 등 결제 상태가 변해도 최초에 결제된 결제 금액으로 유지됩니다.',
  })
  @Column()
  totalAmount: number;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '취소할 수 있는 금액(잔고)입니다. 이 값은 결제 취소나 부분 취소가 되고 나서 남은 값입니다. 결제 상태 변화에 따라 vat, suppliedAmount, taxFreeAmount, taxExemptionAmount와 함께 값이 변합니다.',
  })
  @Column()
  balanceAmount: number;

  @ApiProperty({
    example: '생수 외 1건',
    description:
      '결제 처리 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다. 상태 변화 흐름이 궁금하다면 흐름도를 살펴보세요.\n' +
      '\n' +
      '- READY: 결제를 생성하면 가지게 되는 초기 상태입니다. 인증 전까지는 READY 상태를 유지합니다.\n' +
      '\n' +
      '- IN_PROGRESS: 결제수단 정보와 해당 결제수단의 소유자가 맞는지 인증을 마친 상태입니다. 결제 승인 API를 호출하면 결제가 완료됩니다.\n' +
      '\n' +
      '- WAITING_FOR_DEPOSIT: 가상계좌 결제 흐름에만 있는 상태로, 결제 고객이 발급된 가상계좌에 입금하는 것을 기다리고 있는 상태입니다.\n' +
      '\n' +
      '- DONE: 인증된 결제수단 정보, 고객 정보로 요청한 결제가 승인된 상태입니다.\n' +
      '\n' +
      '- CANCELED: 승인된 결제가 취소된 상태입니다.\n' +
      '\n' +
      '- PARTIAL_CANCELED: 승인된 결제가 부분 취소된 상태입니다.\n' +
      '\n' +
      '- ABORTED: 결제 승인이 실패한 상태입니다.\n' +
      '\n' +
      '- EXPIRED: 결제 유효 시간 30분이 지나 거래가 취소된 상태입니다. IN_PROGRESS 상태에서 결제 승인 API를 호출하지 않으면 EXPIRED가 됩니다.',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00+09:00',
    description:
      "결제가 일어난 날짜와 시간 정보입니다. yyyy-MM-dd'T'HH:mm:ss±hh:mm ISO 8601 형식입니다.",
  })
  @Column()
  requestedAt: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00+09:00',
    description:
      "결제 승인이 일어난 날짜와 시간 정보입니다. yyyy-MM-dd'T'HH:mm:ss±hh:mm ISO 8601 형식입니다.",
  })
  @Column()
  approvedAt: string;

  @ApiProperty({
    example: '',
    description: '에스크로 사용 여부입니다.',
  })
  @Column()
  useEscrow: boolean;

  @ApiProperty({
    example: '',
    description:
      '마지막 거래의 키 값입니다. 한 결제 건의 승인 거래와 취소 거래를 구분하는 데 사용됩니다. 예를 들어 결제 승인 후 부분 취소를 두 번 했다면 마지막 부분 취소 거래의 키 값이 할당됩니다. 최대 길이는 64자입니다.',
  })
  @Column({ nullable: true })
  lastTransactionKey: string;

  @ApiProperty({
    example: '',
    description:
      '공급가액입니다. 결제 취소 및 부분 취소가 되면 공급가액도 일부 취소되어 값이 바뀝니다.',
  })
  @Column()
  suppliedAmount: number;

  @ApiProperty({
    example: '',
    description:
      '부가세입니다. 결제 취소 및 부분 취소가 되면 부가세도 일부 취소되어 값이 바뀝니다. (결제 금액 amount - 면세 금액 taxFreeAmount) / 11 후 소수점 첫째 자리에서 반올림해서 계산합니다.',
  })
  @Column()
  vat: number;

  @ApiProperty({
    example: 'false',
    description:
      '문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다. 계좌이체, 가상계좌 결제에만 적용됩니다.',
  })
  @Column()
  cultureExpense: boolean;

  @ApiProperty({
    example: '0',
    description:
      '결제 금액 중 면세 금액입니다. 결제 취소 및 부분 취소가 되면 면세 금액도 일부 취소되어 값이 바뀝니다.',
  })
  @Column()
  taxFreeAmount: number;

  @ApiProperty({
    example: '',
    description:
      '과세를 제외한 결제 금액(컵 보증금 등)입니다. 이 값은 결제 취소 및 부분 취소가 되면 과세 제외 금액도 일부 취소되어 값이 바뀝니다.',
  })
  @Column()
  taxExemptionAmount: number;

  @ApiProperty({
    example: 'false',
    description:
      '부분 취소 가능 여부입니다. 이 값이 false이면 전액 취소만 가능합니다.',
  })
  @Column()
  isPartialCancelable: boolean;

  @ApiProperty({
    example: '',
    description: '결제 취소 이력입니다.',
  })
  @Column({ nullable: true, type: 'text' })
  cancels: [];

  @ApiProperty({
    example: '',
    description: '카드로 결제하면 제공되는 카드 관련 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  card: object;

  @ApiProperty({
    example: '',
    description: '가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  virtualAccount: object;

  @ApiProperty({
    example: '',
    description:
      '가상계좌 웹훅이 정상적인 요청인지 검증하는 값입니다. 이 값이 가상계좌 웹훅 이벤트 본문으로 돌아온 secret과 같으면 정상적인 요청입니다. 최대 길이는 50자입니다.',
  })
  @Column({ nullable: true })
  secret: string;

  @ApiProperty({
    example: '',
    description: '휴대폰으로 결제하면 제공되는 휴대폰 결제 관련 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  mobilePhone: object;

  @ApiProperty({
    example: '',
    description: '상품권으로 결제하면 제공되는 상품권 결제 관련 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  giftCertificate: object;

  @ApiProperty({
    example: '',
    description: '계좌이체로 결제했을 때 이체 정보가 담기는 객체입니다.',
  })
  @Column({ nullable: true, type: "text" })
  transfer: object;

  @ApiProperty({
    example: '',
    description: '발행된 영수증 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  receipt: object;

  @ApiProperty({
    example: '',
    description: '결제창 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  checkout: object;

  @ApiProperty({
    example: '',
    description:
      '간편결제 정보입니다. 고객이 선택한 결제수단에 따라 amount, discountAmount가 달라집니다. 간편결제 응답 확인 가이드를 참고하세요.',
  })
  @Column({ nullable: true, type: "text"})
  easyPay: object;

  @ApiProperty({
    example: '',
    description: '결제한 국가입니다. ISO-3166의 두 자리 국가 코드 형식입니다.',
  })
  @Column()
  country: string;

  @ApiProperty({
    example: '',
    description:
      '결제 승인에 실패하면 응답으로 받는 에러 객체입니다. 실패한 결제를 조회할 때 확인할 수 있습니다.',
  })
  @Column({ nullable: true, type: "text" })
  failure: object;

  @ApiProperty({
    example: '',
    description: '현금영수증 정보입니다.',
  })
  @Column({ nullable: true, type: "text" })
  cashReceipt: object;

  @ApiProperty({
    example: '',
    description:
      '현금영수증 발행 및 취소 이력이 담기는 배열입니다. 순서는 보장되지 않습니다. 예를 들어 결제 후 부분 취소가 여러 번 일어나면 모든 결제 및 부분 취소 건에 대한 현금영수증 정보를 담고 있습니다.',
  })
  @Column({ nullable: true, type: "text" })
  cashReceipts: object;

  @ApiProperty({
    example: '',
    description:
      '카드사의 즉시 할인 프로모션 정보입니다. 즉시 할인 프로모션이 적용됐을 때만 생성됩니다.',
  })
  @Column({ nullable: true, type: "text" })
  discount: object;
}
