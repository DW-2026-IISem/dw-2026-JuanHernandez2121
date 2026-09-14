import { Status } from '../../../../../common/enums/status.enum';
import { Attendance } from '../../domain/entities/attendance.entity';
import { AttendanceResponseDto } from '../dto/attendance-response.dto';
import { AttendanceModel } from '../../infrastructure/persistence/models/attendance.model';

export class AttendanceMapper {
  static toDomain(model: AttendanceModel): Attendance {
    return Attendance.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      membershipId: model.membershipId,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Attendance): AttendanceResponseDto {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      membershipId: entity.membershipId,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Attendance): Partial<AttendanceModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description ?? null,
      membershipId: entity.membershipId,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
