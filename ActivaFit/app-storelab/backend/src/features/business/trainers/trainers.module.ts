import { Module } from '@nestjs/common';
import { TRAINER_REPOSITORY } from './domain/interfaces/trainer-repository.interface';
import { TrainerRepository } from './infrastructure/persistence/repositories/trainer.repository';
import { CreateTrainerUseCase } from './application/use-cases/create-trainer.use-case';
import { UpdateTrainerUseCase } from './application/use-cases/update-trainer.use-case';
import { DeleteTrainerUseCase } from './application/use-cases/delete-trainer.use-case';
import { GetTrainerUseCase } from './application/use-cases/get-trainer.use-case';
import { ListTrainersUseCase } from './application/use-cases/list-trainers.use-case';
import { TrainersController } from './presentation/http/controllers/trainers.controller';

@Module({
  controllers: [TrainersController],
  providers: [
    TrainerRepository,
    { provide: TRAINER_REPOSITORY, useExisting: TrainerRepository },
    CreateTrainerUseCase,
    UpdateTrainerUseCase,
    DeleteTrainerUseCase,
    GetTrainerUseCase,
    ListTrainersUseCase,
  ],
  exports: [TRAINER_REPOSITORY],
})
export class TrainersModule {}
