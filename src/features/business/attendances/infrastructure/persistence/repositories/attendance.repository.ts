import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Attendance } from '../../../domain/entities/attendance.entity';
import {
  AttendanceFindAllParams,
  IAttendanceRepository,
} from '../../../domain/interfaces/attendance-repository.interface';
import { AttendanceMapper } from '../../../application/mappers/attendance.mapper';
import { AttendanceModel } from '../models/attendance.model';

@Injectable()
export class AttendanceRepository implements IAttendanceRepository {
  async create(attendance: Attendance): Promise<Attendance> {
    const model = await AttendanceModel.create(
      AttendanceMapper.toPersistence(attendance),
    );
    return AttendanceMapper.toDomain(model);
  }

  async update(attendance: Attendance): Promise<Attendance> {
    await AttendanceModel.update(
      AttendanceMapper.toPersistence(attendance),
      {
        where: { id: attendance.id },
      },
    );
    const updated = await AttendanceModel.findByPk(attendance.id!);
    return AttendanceMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await AttendanceModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Attendance | null> {
    const model = await AttendanceModel.findByPk(id);
    return model ? AttendanceMapper.toDomain(model) : null;
  }

  async findByMembershipId(membershipId: number): Promise<Attendance | null> {
    const model = await AttendanceModel.findOne({
      where: { membershipId },
    });
    return model ? AttendanceMapper.toDomain(model) : null;
  }

  async findAll(params: AttendanceFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${params.search}%` } },
            { description: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await AttendanceModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => AttendanceMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
