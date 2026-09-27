import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Trainer } from '../entities/trainer.entity';

export const TRAINER_REPOSITORY = 'TRAINER_REPOSITORY';

export interface TrainerFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ITrainerRepository {
  create(trainer: Trainer): Promise<Trainer>;
  update(trainer: Trainer): Promise<Trainer>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Trainer | null>;
  findByNombre(nombre: string): Promise<Trainer | null>;
  findAll(params: TrainerFindAllParams): Promise<PaginatedResult<Trainer>>;
}
