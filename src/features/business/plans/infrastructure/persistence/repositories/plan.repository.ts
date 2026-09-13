import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Plan } from '../../../domain/entities/plan.entity';
import {
  IPlanRepository,
  PlanFindAllParams,
} from '../../../domain/interfaces/plan-repository.interface';
import { PlanMapper } from '../../../application/mappers/plan.mapper';
import { PlanModel } from '../models/plan.model';

@Injectable()
export class PlanRepository implements IPlanRepository {
  async create(plan: Plan): Promise<Plan> {
    const model = await PlanModel.create(PlanMapper.toPersistence(plan));
    return PlanMapper.toDomain(model);
  }

  async update(plan: Plan): Promise<Plan> {
    await PlanModel.update(PlanMapper.toPersistence(plan), {
      where: { id: plan.id },
    });

    const updated = await PlanModel.findByPk(plan.id!);
    return PlanMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await PlanModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Plan | null> {
    const model = await PlanModel.findByPk(id);
    return model ? PlanMapper.toDomain(model) : null;
  }

  async findAll(params: PlanFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { nombre: { [Op.like]: `%${params.search}%` } },
            { descripcion: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await PlanModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => PlanMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
