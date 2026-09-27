import { Inject, Injectable } from '@nestjs/common';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-not-found.exception';
import {
  ATTENDANCE_REPOSITORY,
  type IAttendanceRepository,
} from '../../domain/interfaces/attendance-repository.interface';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetAttendanceUseCase {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(id: number) {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new AttendanceNotFoundException(id);
    }

    return AttendanceMapper.toResponse(attendance);
  }
}
