import { Module } from '@nestjs/common';
import { MEMBERSHIP_REPOSITORY } from './domain/interfaces/membership-repository.interface';
import { MembershipRepository } from './infrastructure/persistence/repositories/membership.repository';
import { CreateMembershipUseCase } from './application/use-cases/create-membership.use-case';
import { UpdateMembershipUseCase } from './application/use-cases/update-membership.use-case';
import { DeleteMembershipUseCase } from './application/use-cases/delete-membership.use-case';
import { GetMembershipUseCase } from './application/use-cases/get-membership.use-case';
import { ListMembershipsUseCase } from './application/use-cases/list-memberships.use-case';
import { MembershipsController } from './presentation/http/controllers/memberships.controller';

@Module({
  controllers: [MembershipsController],
  providers: [
    MembershipRepository,
    { provide: MEMBERSHIP_REPOSITORY, useExisting: MembershipRepository },
    CreateMembershipUseCase,
    UpdateMembershipUseCase,
    DeleteMembershipUseCase,
    GetMembershipUseCase,
    ListMembershipsUseCase,
  ],
  exports: [MEMBERSHIP_REPOSITORY],
})
export class MembershipsModule {}
