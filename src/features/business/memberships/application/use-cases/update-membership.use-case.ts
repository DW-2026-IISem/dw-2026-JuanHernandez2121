import { Inject, Injectable } from '@nestjs/common';
import { MembershipAlreadyExistsException } from '../../domain/exceptions/membership-already-exists.exception';
import { MembershipNotFoundException } from '../../domain/exceptions/membership-not-found.exception';
import {
  MEMBERSHIP_REPOSITORY,
  type IMembershipRepository,
} from '../../domain/interfaces/membership-repository.interface';
import { UpdateMembershipDto } from '../dto/update-membership.dto';
import { MembershipMapper } from '../mappers/membership.mapper';

@Injectable()
export class UpdateMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(id: number, dto: UpdateMembershipDto) {
    const membership = await this.membershipRepository.findById(id);

    if (!membership) {
      throw new MembershipNotFoundException(id);
    }

    if (
      dto.nombre &&
      dto.nombre.toLowerCase() !== membership.nombre.toLowerCase()
    ) {
      const memberships = await this.membershipRepository.findAll({
        page: 1,
        limit: 100,
        search: dto.nombre,
      });

      const existing = memberships.items.find(
        (item) =>
          item.id !== id &&
          item.nombre.toLowerCase() === dto.nombre!.toLowerCase(),
      );

      if (existing) {
        throw new MembershipAlreadyExistsException(dto.nombre);
      }
    }

    membership.update({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      planId: dto.planId,
      clienteId: dto.clienteId,
    });

    if (dto.isActive === false) {
      membership.deactivate();
    }

    const updated = await this.membershipRepository.update(membership);
    return MembershipMapper.toResponse(updated);
  }
}
