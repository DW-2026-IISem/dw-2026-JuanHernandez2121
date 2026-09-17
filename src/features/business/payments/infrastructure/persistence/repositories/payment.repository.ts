import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Payment } from '../../../domain/entities/payment.entity';
import {
  PaymentFindAllParams,
  IPaymentRepository,
} from '../../../domain/interfaces/payment-repository.interface';
import { PaymentMapper } from '../../../application/mappers/payment.mapper';
import { PaymentModel } from '../models/payment.model';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  async create(payment: Payment): Promise<Payment> {
    const model = await PaymentModel.create(
      PaymentMapper.toPersistence(payment),
    );
    return PaymentMapper.toDomain(model);
  }

  async update(payment: Payment): Promise<Payment> {
    await PaymentModel.update(PaymentMapper.toPersistence(payment), {
      where: { id: payment.id },
    });

    const updated = await PaymentModel.findByPk(payment.id!);
    return PaymentMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await PaymentModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Payment | null> {
    const model = await PaymentModel.findByPk(id);
    return model ? PaymentMapper.toDomain(model) : null;
  }

  async findByMembershipId(
    membresiaId: number,
  ): Promise<Payment | null> {
    const model = await PaymentModel.findOne({
      where: { membresiaId },
    });

    return model ? PaymentMapper.toDomain(model) : null;
  }

  async findAll(params: PaymentFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { metodoPago: { [Op.like]: `%${params.search}%` } },
            { status: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await PaymentModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['fechaPago', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => PaymentMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
