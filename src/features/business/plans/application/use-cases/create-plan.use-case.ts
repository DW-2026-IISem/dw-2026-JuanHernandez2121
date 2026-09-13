import { Inject, Injectable } from '@nestjs/common';
import { PlanAlreadyExistsException } from '../../domain/exceptions/plan-already-exists.exception';
import { Plan } from '../../domain/entities/plan.entity';
import {
  PLAN_REPOSITORY,
  type IPlanRepository,
} from '../../domain/interfaces/plan-repository.interface';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { PlanMapper } from '../mappers/plan.mapper';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(dto: CreatePlanDto) {
    const plans = await this.planRepository.findAll({
      page: 1,
      limit: 100,
      search: dto.nombre,
    });

    const existing = plans.items.find(
      (plan) => plan.nombre.toLowerCase() === dto.nombre.toLowerCase(),
    );

    if (existing) {
      throw new PlanAlreadyExistsException(dto.nombre);
    }

    const plan = Plan.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
    });

    if (dto.isActive === false) {
      plan.deactivate();
    }

    const created = await this.planRepository.create(plan);
    return PlanMapper.toResponse(created);
  }
}
