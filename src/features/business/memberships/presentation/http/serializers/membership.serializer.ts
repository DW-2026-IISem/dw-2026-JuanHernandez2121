import { Membership } from '../../../domain/entities/membership.entity';
import { MembershipResponseDto } from '../../../application/dto/membership-response.dto';
import { MembershipMapper } from '../../../application/mappers/membership.mapper';

export class MembershipSerializer {
  static serialize(entity: Membership): MembershipResponseDto {
    return MembershipMapper.toResponse(entity);
  }
}
