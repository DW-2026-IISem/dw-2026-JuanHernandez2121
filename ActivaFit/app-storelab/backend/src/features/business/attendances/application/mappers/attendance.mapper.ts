import { Status } from '../../../../../common/enums/status.enum';
import { Attendance } from '../../domain/entities/attendance.entity';
import { AttendanceResponseDto } from '../dto/attendance-response.dto';
import { AttendanceModel } from '../../infrastructure/persistence/models/attendance.model';

export class AttendanceMapper {
  static toDomain(model: AttendanceModel): Attendance {
    return Attendance.reconstitute({
      id: model.id,
      nombre: model.name,
      descripcion: model.description ?? undefined,
      membresiaId: model.membershipId,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Attendance): AttendanceResponseDto {
    return {
      id: entity.id!,
      name: entity.nombre,
      description: entity.descripcion,
      membershipId: entity.membresiaId,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Attendance): Partial<AttendanceModel> {
    return {
      id: entity.id,
      name: entity.nombre,
      description: entity.descripcion ?? null,
      membershipId: entity.membresiaId,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
