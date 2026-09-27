import { Inject, Injectable } from '@nestjs/common';
import { PlanNotFoundException } from '../../domain/exceptions/plan-not-found.exception';
import {
  PLAN_REPOSITORY,
  type IPlanRepository,
} from '../../domain/interfaces/plan-repository.interface';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new PlanNotFoundException(id);
    }

    await this.planRepository.delete(id);
  }
}
