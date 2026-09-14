import { Attendance } from '../../../domain/entities/attendance.entity';
import { AttendanceResponseDto } from '../../../application/dto/attendance-response.dto';
import { AttendanceMapper } from '../../../application/mappers/attendance.mapper';

export class AttendanceSerializer {
  static serialize(entity: Attendance): AttendanceResponseDto {
    return AttendanceMapper.toResponse(entity);
  }
}
