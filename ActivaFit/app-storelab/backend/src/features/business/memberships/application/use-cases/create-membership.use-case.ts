import { Inject, Injectable } from '@nestjs/common';
import { MembershipAlreadyExistsException } from '../../domain/exceptions/membership-already-exists.exception';
import { Membership } from '../../domain/entities/membership.entity';
import {
  MEMBERSHIP_REPOSITORY,
  type IMembershipRepository,
} from '../../domain/interfaces/membership-repository.interface';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { MembershipMapper } from '../mappers/membership.mapper';

@Injectable()
export class CreateMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(dto: CreateMembershipDto) {
    const memberships = await this.membershipRepository.findAll({
      page: 1,
      limit: 100,
      search: dto.nombre,
    });

    const existing = memberships.items.find(
      (membership) =>
        membership.nombre.toLowerCase() === dto.nombre.toLowerCase(),
    );

    if (existing) {
      throw new MembershipAlreadyExistsException(dto.nombre);
    }

    const membership = Membership.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      planId: dto.planId,
      clienteId: dto.clienteId,
    });

    if (dto.isActive === false) {
      membership.deactivate();
    }

    const created = await this.membershipRepository.create(membership);
    return MembershipMapper.toResponse(created);
  }
}
