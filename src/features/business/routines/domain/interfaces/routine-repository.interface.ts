import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Routine } from '../entities/routine.entity';

export const ROUTINE_REPOSITORY = 'ROUTINE_REPOSITORY';

export interface RoutineFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IRoutineRepository {
  create(routine: Routine): Promise<Routine>;
  update(routine: Routine): Promise<Routine>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Routine | null>;
  findByNombre(nombre: string): Promise<Routine | null>;
  findByEntrenadorId(entrenadorId: number): Promise<Routine[]>;
  findByClienteId(clienteId: number): Promise<Routine[]>;
  findAll(params: RoutineFindAllParams): Promise<PaginatedResult<Routine>>;
}
