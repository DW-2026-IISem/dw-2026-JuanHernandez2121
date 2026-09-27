import { Inject, Injectable } from '@nestjs/common';
import { ClientEmailAlreadyExistsException } from '../../domain/exceptions/client-email-already-exists.exception';
import { ClientNotFoundException } from '../../domain/exceptions/client-not-found.exception';
import {
  CLIENT_REPOSITORY,
  type IClientRepository,
} from '../../domain/interfaces/client-repository.interface';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: number, dto: UpdateClientDto) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new ClientNotFoundException(id);
    }

    if (dto.email && dto.email !== client.email) {
      const existing = await this.clientRepository.findByEmail(dto.email);

      if (existing) {
        throw new ClientEmailAlreadyExistsException(dto.email);
      }
    }

    if (
      dto.numeroDocumento &&
      dto.numeroDocumento !== client.numeroDocumento
    ) {
      const existing = await this.clientRepository.findByNumeroDocumento(
        dto.numeroDocumento,
      );

      if (existing) {
        throw new Error(
          `El número de documento '${dto.numeroDocumento}' ya está registrado`,
        );
      }
    }

    client.update({
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      nombre: dto.nombre,
      telefono: dto.telefono,
      email: dto.email,
      
    });

    const updated = await this.clientRepository.update(client);

    return ClientMapper.toResponse(updated);
  }
}
