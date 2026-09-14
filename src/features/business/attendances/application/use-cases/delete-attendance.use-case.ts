import { Inject, Injectable } from '@nestjs/common';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-not-found.exception';
import {
  ATTENDANCE_REPOSITORY,
  type IAttendanceRepository,
} from '../../domain/interfaces/attendance-repository.interface';

@Injectable()
export class DeleteAttendanceUseCase {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new AttendanceNotFoundException(id);
    }

    await this.attendanceRepository.delete(id);
  }
}
