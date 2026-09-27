import { Plan } from '../../../domain/entities/plan.entity';
import { PlanResponseDto } from '../../../application/dto/plan-response.dto';
import { PlanMapper } from '../../../application/mappers/plan.mapper';

export class PlanSerializer {
  static serialize(entity: Plan): PlanResponseDto {
    return PlanMapper.toResponse(entity);
  }
}
