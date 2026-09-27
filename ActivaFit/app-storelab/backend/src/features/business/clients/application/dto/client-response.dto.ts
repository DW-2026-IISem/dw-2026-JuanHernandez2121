import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'CC' })
  tipoDocumento: string;

  @ApiProperty({ example: '1001001001' })
  numeroDocumento: string;

  @ApiProperty({ example: 'Juan Pérez' })
  nombre: string;

  @ApiPropertyOptional({ example: '+57 300 1234567' })
  telefono?: string;

  @ApiPropertyOptional({ example: 'juan.perez@example.com' })
  email?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
