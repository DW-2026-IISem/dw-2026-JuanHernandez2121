import { Status } from '../../../../../common/enums/status.enum';
import { Trainer } from '../../domain/entities/trainer.entity';
import { TrainerResponseDto } from '../dto/trainer-response.dto';
import { TrainerModel } from '../../infrastructure/persistence/models/trainer.model';

export class TrainerMapper {
  static toDomain(model: TrainerModel): Trainer {
    return Trainer.reconstitute({
      id: model.id,
      nombre: model.nombre,
      descripcion: model.descripcion ?? undefined,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Trainer): TrainerResponseDto {
    return {
      id: entity.id!,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Trainer): Partial<TrainerModel> {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion ?? null,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
