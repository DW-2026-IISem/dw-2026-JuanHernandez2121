import { Payment } from '../../domain/entities/payment.entity';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { PaymentModel } from '../../infrastructure/persistence/models/payment.model';

export class PaymentMapper {
  static toDomain(model: PaymentModel): Payment {
    return Payment.reconstitute({
      id: model.id,
      monto: Number(model.monto),
      fechaPago: model.fechaPago,
      metodoPago: model.metodoPago,
      membresiaId: model.membresiaId,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Payment): PaymentResponseDto {
    return {
      id: entity.id!,
      monto: entity.monto,
      fechaPago: entity.fechaPago,
      metodoPago: entity.metodoPago,
      membresiaId: entity.membresiaId,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Payment): Partial<PaymentModel> {
    return {
      id: entity.id,
      monto: entity.monto,
      fechaPago: entity.fechaPago,
      metodoPago: entity.metodoPago,
      membresiaId: entity.membresiaId,
      status: entity.status ?? PaymentStatus.PENDING,
    };
  }
}
