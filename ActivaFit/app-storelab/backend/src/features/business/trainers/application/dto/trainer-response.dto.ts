import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class TrainerResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Carlos Rodríguez' })
  nombre: string;

  @ApiPropertyOptional({
    example: 'Entrenador especializado en acondicionamiento físico',
  })
  descripcion?: string;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
