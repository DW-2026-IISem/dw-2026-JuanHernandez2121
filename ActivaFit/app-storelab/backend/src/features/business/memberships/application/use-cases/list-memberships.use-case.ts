import { Inject, Injectable } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  type IMembershipRepository,
} from '../../domain/interfaces/membership-repository.interface';
import { MembershipFilterDto } from '../dto/membership-filter.dto';
import { MembershipMapper } from '../mappers/membership.mapper';

@Injectable()
export class ListMembershipsUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(filter: MembershipFilterDto) {
    const result = await this.membershipRepository.findAll(filter);

    return {
      items: result.items.map((membership) =>
        MembershipMapper.toResponse(membership),
      ),
      meta: result.meta,
    };
  }
}
