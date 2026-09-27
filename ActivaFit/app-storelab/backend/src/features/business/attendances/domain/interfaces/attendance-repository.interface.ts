import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Attendance } from '../entities/attendance.entity';

export const ATTENDANCE_REPOSITORY = 'ATTENDANCE_REPOSITORY';

export interface AttendanceFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IAttendanceRepository {
  create(attendance: Attendance): Promise<Attendance>;
  update(attendance: Attendance): Promise<Attendance>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Attendance | null>;
  findAll(
    params: AttendanceFindAllParams,
  ): Promise<PaginatedResult<Attendance>>;
}
