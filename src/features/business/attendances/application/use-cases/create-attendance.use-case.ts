import { Inject, Injectable } from '@nestjs/common';
import { AttendanceAlreadyExistsException } from '../../domain/exceptions/attendance-already-exists.exception';
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
    const existing = await this.attendanceRepository.findByMembershipId(
      dto.membershipId,
    );

    if (existing) {
      throw new AttendanceAlreadyExistsException(dto.membershipId);
    }

    const attendance = Attendance.create({
      name: dto.name,
      description: dto.description,
      membershipId: dto.membershipId,
    });

    const created = await this.attendanceRepository.create(attendance);
    return AttendanceMapper.toResponse(created);
  }
}
