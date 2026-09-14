import { Inject, Injectable } from '@nestjs/common';
import { MembershipNotFoundException } from '../../domain/exceptions/membership-not-found.exception';
import {
  MEMBERSHIP_REPOSITORY,
  type IMembershipRepository,
} from '../../domain/interfaces/membership-repository.interface';
import { MembershipMapper } from '../mappers/membership.mapper';

@Injectable()
export class GetMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(id: number) {
    const membership = await this.membershipRepository.findById(id);

    if (!membership) {
      throw new MembershipNotFoundException(id);
    }

    return MembershipMapper.toResponse(membership);
  }
}
