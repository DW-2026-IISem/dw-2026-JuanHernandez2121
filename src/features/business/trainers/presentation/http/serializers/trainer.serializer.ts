import { Trainer } from '../../../domain/entities/trainer.entity';
import { TrainerResponseDto } from '../../../application/dto/trainer-response.dto';
import { TrainerMapper } from '../../../application/mappers/trainer.mapper';

export class TrainerSerializer {
  static serialize(entity: Trainer): TrainerResponseDto {
    return TrainerMapper.toResponse(entity);
  }
}
