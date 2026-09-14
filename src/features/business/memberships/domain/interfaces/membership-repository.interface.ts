import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Membership } from '../entities/membership.entity';

export const MEMBERSHIP_REPOSITORY = 'MEMBERSHIP_REPOSITORY';

export interface MembershipFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IMembershipRepository {
  create(membership: Membership): Promise<Membership>;
  update(membership: Membership): Promise<Membership>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Membership | null>;
  findAll(params: MembershipFindAllParams): Promise<PaginatedResult<Membership>>;
}
