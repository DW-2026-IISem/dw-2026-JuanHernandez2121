import { Status } from '../../../../../common/enums/status.enum';
import { Routine } from '../../domain/entities/routine.entity';
import { RoutineResponseDto } from '../dto/routine-response.dto';
import { RoutineModel } from '../../infrastructure/persistence/models/routine.model';

export class RoutineMapper {
  static toDomain(model: RoutineModel): Routine {
    return Routine.reconstitute({
      id: model.id,
      nombre: model.nombre,
      descripcion: model.descripcion ?? undefined,
      entrenadorId: model.entrenadorId,
      clienteId: model.clienteId,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Routine): RoutineResponseDto {
    return {
      id: entity.id!,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      entrenadorId: entity.entrenadorId,
      clienteId: entity.clienteId,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Routine): Partial<RoutineModel> {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion ?? null,
      entrenadorId: entity.entrenadorId,
      clienteId: entity.clienteId,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
