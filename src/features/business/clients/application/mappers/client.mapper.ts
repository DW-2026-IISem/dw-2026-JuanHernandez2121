import { Client } from '../../domain/entities/client.entity';
import { ClientResponseDto } from '../dto/client-response.dto';
import { ClientModel } from '../../infrastructure/persistence/models/client.model';

export class ClientMapper {
  static toDomain(model: ClientModel): Client {
    return Client.reconstitute({
      id: model.id,
      tipoDocumento: model.tipoDocumento,
      numeroDocumento: model.numeroDocumento,
      nombre: model.nombre,
      telefono: model.telefono ?? undefined,
      email: model.email ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Client): ClientResponseDto {
    return {
      id: entity.id!,
      tipoDocumento: entity.tipoDocumento,
      numeroDocumento: entity.numeroDocumento,
      nombre: entity.nombre,
      telefono: entity.telefono,
      email: entity.email,
      isActive: entity.isActive,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Client): Partial<ClientModel> {
    return {
      id: entity.id,
      tipoDocumento: entity.tipoDocumento,
      numeroDocumento: entity.numeroDocumento,
      nombre: entity.nombre,
      telefono: entity.telefono ?? null,
      email: entity.email ?? null,
      isActive: entity.isActive,
    };
  }
}
