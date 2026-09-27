import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class RoutineResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Rutina de acondicionamiento físico' })
  nombre: string;

  @ApiPropertyOptional({
    example: 'Rutina enfocada en mejorar la condición física general',
  })
  descripcion?: string;

  @ApiProperty({ example: 1 })
  entrenadorId: number;

  @ApiProperty({ example: 1 })
  clienteId: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
