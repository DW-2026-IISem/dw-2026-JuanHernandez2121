import { Inject, Injectable } from '@nestjs/common';
import { PlanAlreadyExistsException } from '../../domain/exceptions/plan-already-exists.exception';
import { PlanNotFoundException } from '../../domain/exceptions/plan-not-found.exception';
import {
  PLAN_REPOSITORY,
  type IPlanRepository,
} from '../../domain/interfaces/plan-repository.interface';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanMapper } from '../mappers/plan.mapper';

@Injectable()
export class UpdatePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private readonly planRepository: IPlanRepository,
  ) {}

  async execute(id: number, dto: UpdatePlanDto) {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new PlanNotFoundException(id);
    }

    if (dto.nombre && dto.nombre.toLowerCase() !== plan.nombre.toLowerCase()) {
      const plans = await this.planRepository.findAll({
        page: 1,
        limit: 100,
        search: dto.nombre,
      });

      const existing = plans.items.find(
        (item) =>
          item.id !== id &&
          item.nombre.toLowerCase() === dto.nombre!.toLowerCase(),
      );

      if (existing) {
        throw new PlanAlreadyExistsException(dto.nombre);
      }
    }

    plan.update({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
    });

    if (dto.isActive === false) {
      plan.deactivate();
    }

    const updated = await this.planRepository.update(plan);
    return PlanMapper.toResponse(updated);
  }
}
