import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRoutineDto {
  @ApiProperty({ example: 'Rutina de acondicionamiento físico' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({
    example: 'Rutina enfocada en mejorar la condición física general',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  entrenadorId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  clienteId: number;
}
