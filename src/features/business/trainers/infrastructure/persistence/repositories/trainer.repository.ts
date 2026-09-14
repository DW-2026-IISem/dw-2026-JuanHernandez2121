import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Trainer } from '../../../domain/entities/trainer.entity';
import {
  TrainerFindAllParams,
  ITrainerRepository,
} from '../../../domain/interfaces/trainer-repository.interface';
import { TrainerMapper } from '../../../application/mappers/trainer.mapper';
import { TrainerModel } from '../models/trainer.model';

@Injectable()
export class TrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<Trainer> {
    const model = await TrainerModel.create(
      TrainerMapper.toPersistence(trainer),
    );
    return TrainerMapper.toDomain(model);
  }

  async update(trainer: Trainer): Promise<Trainer> {
    await TrainerModel.update(
      TrainerMapper.toPersistence(trainer),
      {
        where: { id: trainer.id },
      },
    );
    const updated = await TrainerModel.findByPk(trainer.id!);
    return TrainerMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await TrainerModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Trainer | null> {
    const model = await TrainerModel.findByPk(id);
    return model ? TrainerMapper.toDomain(model) : null;
  }

  async findByNombre(nombre: string): Promise<Trainer | null> {
    const model = await TrainerModel.findOne({ where: { nombre } });
    return model ? TrainerMapper.toDomain(model) : null;
  }

  async findAll(params: TrainerFindAllParams) {
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

    const { rows, count } = await TrainerModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => TrainerMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
