import { Inject, Injectable } from '@nestjs/common';
import { PlanNotFoundException } from '../../domain/exceptions/plan-not-found.exception';
import {
  PLAN_REPOSITORY,
  type IPlanRepository,
} from '../../domain/interfaces/plan-repository.interface';
import { PlanMapper } from '../mappers/plan.mapper';

@Injectable()
export class GetPlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(id: number) {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new PlanNotFoundException(id);
    }

    return PlanMapper.toResponse(plan);
  }
}
