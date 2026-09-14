import { Inject, Injectable } from '@nestjs/common';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-not-found.exception';
import {
  ATTENDANCE_REPOSITORY,
  type IAttendanceRepository,
} from '../../domain/interfaces/attendance-repository.interface';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class UpdateAttendanceUseCase {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(id: number, dto: UpdateAttendanceDto) {
    const attendance = await this.attendanceRepository.findById(id);

    if (!attendance) {
      throw new AttendanceNotFoundException(id);
    }

    attendance.update({
      ...(dto.name !== undefined && { nombre: dto.name }),
      ...(dto.description !== undefined && { descripcion: dto.description }),
      ...(dto.membershipId !== undefined && {
        membresiaId: dto.membershipId,
      }),
    });

    const updated = await this.attendanceRepository.update(attendance);

    return AttendanceMapper.toResponse(updated);
  }
}
