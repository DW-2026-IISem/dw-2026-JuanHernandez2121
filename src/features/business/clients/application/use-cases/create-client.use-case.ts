import { Inject, Injectable } from '@nestjs/common';
import { ClientEmailAlreadyExistsException } from '../../domain/exceptions/client-email-already-exists.exception';
import { Client } from '../../domain/entities/client.entity';
import {
  CLIENT_REPOSITORY,
  type IClientRepository,
} from '../../domain/interfaces/client-repository.interface';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(dto: CreateClientDto) {
    if (dto.email) {
      const existingByEmail = await this.clientRepository.findByEmail(dto.email);

      if (existingByEmail) {
        throw new ClientEmailAlreadyExistsException(dto.email);
      }
    }

    const existingByNumeroDocumento =
      await this.clientRepository.findByNumeroDocumento(dto.numeroDocumento);

    if (existingByNumeroDocumento) {
      throw new Error(
        `El número de documento '${dto.numeroDocumento}' ya está registrado`,
      );
    }

    const client = Client.create({
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      nombre: dto.nombre,
      telefono: dto.telefono,
      email: dto.email,
      
    });

    const created = await this.clientRepository.create(client);

    return ClientMapper.toResponse(created);
  }
}
