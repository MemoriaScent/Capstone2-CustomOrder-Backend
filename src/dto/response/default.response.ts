import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseDto {
  status: number;
  token: unknown;
}
