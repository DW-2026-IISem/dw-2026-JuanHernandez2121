import { PaymentModel } from '../models/payment.model';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';

export async function seedPayments(): Promise<void> {
  const count = await PaymentModel.count();

  if (count > 0) {
    return;
  }

  await PaymentModel.bulkCreate([
    {
      monto: 150000,
      fechaPago: new Date('2026-09-10'),
      metodoPago: 'transferencia',
      membresiaId: 1,
      status: PaymentStatus.ACTIVE,
    },
    {
      monto: 100000,
      fechaPago: new Date('2026-09-15'),
      metodoPago: 'efectivo',
      membresiaId: 2,
      status: PaymentStatus.PENDING,
    },
  ]);
}
