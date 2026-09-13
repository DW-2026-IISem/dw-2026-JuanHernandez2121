import { Module } from '@nestjs/common';
import { PLAN_REPOSITORY } from './domain/interfaces/plan-repository.interface';
import { PlanRepository } from './infrastructure/persistence/repositories/plan.repository';
import { CreatePlanUseCase } from './application/use-cases/create-plan.use-case';
import { UpdatePlanUseCase } from './application/use-cases/update-plan.use-case';
import { DeletePlanUseCase } from './application/use-cases/delete-plan.use-case';
import { GetPlanUseCase } from './application/use-cases/get-plan.use-case';
import { ListPlansUseCase } from './application/use-cases/list-plans.use-case';
import { PlansController } from './presentation/http/controllers/plans.controller';

@Module({
  controllers: [PlansController],
  providers: [
    PlanRepository,
    { provide: PLAN_REPOSITORY, useExisting: PlanRepository },
    CreatePlanUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase,
    GetPlanUseCase,
    ListPlansUseCase,
  ],
  exports: [PLAN_REPOSITORY],
})
export class PlansModule {}
