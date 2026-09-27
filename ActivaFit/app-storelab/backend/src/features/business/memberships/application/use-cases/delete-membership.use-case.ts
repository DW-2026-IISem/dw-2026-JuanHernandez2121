import { Inject, Injectable } from '@nestjs/common';
import { MembershipNotFoundException } from '../../domain/exceptions/membership-not-found.exception';
import {
  MEMBERSHIP_REPOSITORY,
  type IMembershipRepository,
} from '../../domain/interfaces/membership-repository.interface';

@Injectable()
export class DeleteMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const membership = await this.membershipRepository.findById(id);

    if (!membership) {
      throw new MembershipNotFoundException(id);
    }

    await this.membershipRepository.delete(id);
  }
}
