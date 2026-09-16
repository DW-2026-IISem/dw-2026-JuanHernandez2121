import { Inject, Injectable } from '@nestjs/common';
import { RoutineAlreadyExistsException } from '../../domain/exceptions/routine-already-exists.exception';
import { Routine } from '../../domain/entities/routine.entity';
import {
  ROUTINE_REPOSITORY,
  type IRoutineRepository,
} from '../../domain/interfaces/routine-repository.interface';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { RoutineMapper } from '../mappers/routine.mapper';

@Injectable()
export class CreateRoutineUseCase {
  constructor(
    @Inject(ROUTINE_REPOSITORY)
    private readonly routineRepository: IRoutineRepository,
  ) {}

  async execute(dto: CreateRoutineDto) {
    const existing = await this.routineRepository.findByNombre(dto.nombre);

    if (existing) {
      throw new RoutineAlreadyExistsException(dto.nombre);
    }

    const routine = Routine.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      entrenadorId: dto.entrenadorId,
      clienteId: dto.clienteId,
    });

    const created = await this.routineRepository.create(routine);
    return RoutineMapper.toResponse(created);
  }
}
