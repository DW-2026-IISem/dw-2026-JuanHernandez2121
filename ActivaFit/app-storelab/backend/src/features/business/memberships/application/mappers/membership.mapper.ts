import { Membership } from '../../domain/entities/membership.entity';
import { MembershipResponseDto } from '../dto/membership-response.dto';
import { MembershipModel } from '../../infrastructure/persistence/models/membership.model';

export class MembershipMapper {
  static toDomain(model: MembershipModel): Membership {
    return Membership.reconstitute({
      id: model.id,
      nombre: model.nombre,
      descripcion: model.descripcion ?? undefined,
      planId: model.planId,
      clienteId: model.clienteId,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Membership): MembershipResponseDto {
    return {
      id: entity.id!,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      planId: entity.planId,
      clienteId: entity.clienteId,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Membership): Partial<MembershipModel> {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion ?? null,
      planId: entity.planId,
      clienteId: entity.clienteId,
      status: entity.status,
    };
  }
}
