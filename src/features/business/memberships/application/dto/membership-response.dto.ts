import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class MembershipResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Membresía Premium' })
  nombre: string;

  @ApiPropertyOptional({ example: 'Membresía asociada al plan premium.' })
  descripcion?: string;

  @ApiProperty({ example: 1 })
  planId: number;

  @ApiProperty({ example: 1 })
  clienteId: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
