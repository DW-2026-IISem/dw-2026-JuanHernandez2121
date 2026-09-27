import { Inject, Injectable } from '@nestjs/common';
import {
  PLAN_REPOSITORY,
  type IPlanRepository,
} from '../../domain/interfaces/plan-repository.interface';
import { PlanFilterDto } from '../dto/plan-filter.dto';
import { PlanMapper } from '../mappers/plan.mapper';

@Injectable()
export class ListPlansUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(filter: PlanFilterDto) {
    const result = await this.planRepository.findAll(filter);

    return {
      items: result.items.map((plan) => PlanMapper.toResponse(plan)),
      meta: result.meta,
    };
  }
}
