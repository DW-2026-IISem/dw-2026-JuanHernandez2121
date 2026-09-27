import { Module } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY } from './domain/interfaces/attendance-repository.interface';
import { AttendanceRepository } from './infrastructure/persistence/repositories/attendance.repository';
import { CreateAttendanceUseCase } from './application/use-cases/create-attendance.use-case';
import { UpdateAttendanceUseCase } from './application/use-cases/update-attendance.use-case';
import { DeleteAttendanceUseCase } from './application/use-cases/delete-attendance.use-case';
import { GetAttendanceUseCase } from './application/use-cases/get-attendance.use-case';
import { ListAttendancesUseCase } from './application/use-cases/list-attendances.use-case';
import { AttendancesController } from './presentation/http/controllers/attendances.controller';

@Module({
  controllers: [AttendancesController],
  providers: [
    AttendanceRepository,
    { provide: ATTENDANCE_REPOSITORY, useExisting: AttendanceRepository },
    CreateAttendanceUseCase,
    UpdateAttendanceUseCase,
    DeleteAttendanceUseCase,
    GetAttendanceUseCase,
    ListAttendancesUseCase,
  ],
  exports: [ATTENDANCE_REPOSITORY],
})
export class AttendancesModule {}
