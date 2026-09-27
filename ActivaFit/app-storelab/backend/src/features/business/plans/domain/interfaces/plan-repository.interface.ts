import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Plan } from '../entities/plan.entity';

export const PLAN_REPOSITORY = 'PLAN_REPOSITORY';

export interface PlanFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IPlanRepository {
  create(plan: Plan): Promise<Plan>;
  update(plan: Plan): Promise<Plan>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Plan | null>;
  findAll(params: PlanFindAllParams): Promise<PaginatedResult<Plan>>;
}
