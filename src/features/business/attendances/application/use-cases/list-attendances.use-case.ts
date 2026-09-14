import { Inject, Injectable } from '@nestjs/common';
import {
  ATTENDANCE_REPOSITORY,
  type IAttendanceRepository,
} from '../../domain/interfaces/attendance-repository.interface';
import { AttendanceFilterDto } from '../dto/attendance-filter.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class ListAttendancesUseCase {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(filter: AttendanceFilterDto) {
    const result = await this.attendanceRepository.findAll(filter);
    return {
      items: result.items.map((attendance) =>
        AttendanceMapper.toResponse(attendance),
      ),
      meta: result.meta,
    };
  }
}
