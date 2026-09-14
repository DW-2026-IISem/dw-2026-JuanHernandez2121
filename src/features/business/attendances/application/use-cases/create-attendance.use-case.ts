import { Inject, Injectable } from '@nestjs/common';
import { Attendance } from '../../domain/entities/attendance.entity';
import {
  ATTENDANCE_REPOSITORY,
  type IAttendanceRepository,
} from '../../domain/interfaces/attendance-repository.interface';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class CreateAttendanceUseCase {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(dto: CreateAttendanceDto) {
    const attendance = Attendance.create({
      nombre: dto.name,
      descripcion: dto.description,
      membresiaId: dto.membershipId,
    });

    const created = await this.attendanceRepository.create(attendance);
    return AttendanceMapper.toResponse(created);
  }
}
