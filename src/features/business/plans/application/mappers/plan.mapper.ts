import { Status } from '../../../../../common/enums/status.enum';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanResponseDto } from '../dto/plan-response.dto';
import { PlanModel } from '../../infrastructure/persistence/models/plan.model';

export class PlanMapper {
  static toDomain(model: PlanModel): Plan {
    return Plan.reconstitute({
      id: model.id,
      nombre: model.nombre,
      descripcion: model.descripcion ?? undefined,
      status: model.isActive ? Status.ACTIVE : Status.INACTIVE,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Plan): PlanResponseDto {
    return {
      id: entity.id!,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      isActive: entity.status === Status.ACTIVE,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Plan): Partial<PlanModel> {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion ?? null,
      isActive: entity.status === Status.ACTIVE,
    };
  }
}
