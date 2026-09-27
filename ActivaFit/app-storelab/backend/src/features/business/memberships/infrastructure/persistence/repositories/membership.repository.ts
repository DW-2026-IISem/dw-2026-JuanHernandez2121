import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Membership } from '../../../domain/entities/membership.entity';
import {
  MembershipFindAllParams,
  IMembershipRepository,
} from '../../../domain/interfaces/membership-repository.interface';
import { MembershipMapper } from '../../../application/mappers/membership.mapper';
import { MembershipModel } from '../models/membership.model';

@Injectable()
export class MembershipRepository implements IMembershipRepository {
  async create(membership: Membership): Promise<Membership> {
    const model = await MembershipModel.create(
      MembershipMapper.toPersistence(membership),
    );
    return MembershipMapper.toDomain(model);
  }

  async update(membership: Membership): Promise<Membership> {
    await MembershipModel.update(MembershipMapper.toPersistence(membership), {
      where: { id: membership.id },
    });
    const updated = await MembershipModel.findByPk(membership.id!);
    return MembershipMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await MembershipModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Membership | null> {
    const model = await MembershipModel.findByPk(id);
    return model ? MembershipMapper.toDomain(model) : null;
  }

  async findAll(params: MembershipFindAllParams) {
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

    const { rows, count } = await MembershipModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => MembershipMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
