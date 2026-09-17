import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 150000 })
  monto: number;

  @ApiProperty({ example: '2026-09-17' })
  fechaPago: Date;

  @ApiProperty({ example: 'transferencia' })
  metodoPago: string;

  @ApiProperty({ example: 1 })
  membresiaId: number;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.ACTIVE })
  status: PaymentStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
