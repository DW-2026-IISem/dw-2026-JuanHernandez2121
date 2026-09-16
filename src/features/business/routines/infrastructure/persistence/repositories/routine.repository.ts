import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Routine } from '../../../domain/entities/routine.entity';
import {
  RoutineFindAllParams,
  IRoutineRepository,
} from '../../../domain/interfaces/routine-repository.interface';
import { RoutineMapper } from '../../../application/mappers/routine.mapper';
import { RoutineModel } from '../models/routine.model';

@Injectable()
export class RoutineRepository implements IRoutineRepository {
  async create(routine: Routine): Promise<Routine> {
    const model = await RoutineModel.create(
      RoutineMapper.toPersistence(routine),
    );
    return RoutineMapper.toDomain(model);
  }

  async update(routine: Routine): Promise<Routine> {
    await RoutineModel.update(RoutineMapper.toPersistence(routine), {
      where: { id: routine.id },
    });
    const updated = await RoutineModel.findByPk(routine.id!);
    return RoutineMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await RoutineModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Routine | null> {
    const model = await RoutineModel.findByPk(id);
    return model ? RoutineMapper.toDomain(model) : null;
  }

  async findByNombre(nombre: string): Promise<Routine | null> {
    const model = await RoutineModel.findOne({ where: { nombre } });
    return model ? RoutineMapper.toDomain(model) : null;
  }

  async findByEntrenadorId(entrenadorId: number): Promise<Routine[]> {
    const models = await RoutineModel.findAll({
      where: { entrenadorId },
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => RoutineMapper.toDomain(model));
  }

  async findByClienteId(clienteId: number): Promise<Routine[]> {
    const models = await RoutineModel.findAll({
      where: { clienteId },
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => RoutineMapper.toDomain(model));
  }

  async findAll(params: RoutineFindAllParams) {
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

    const { rows, count } = await RoutineModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => RoutineMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
