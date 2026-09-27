import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class AttendanceResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Asistencia de mañana' })
  name: string;

  @ApiPropertyOptional({ example: 'Registro de asistencia en horario de mañana' })
  description?: string;

  @ApiProperty({ example: 1 })
  membershipId: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
