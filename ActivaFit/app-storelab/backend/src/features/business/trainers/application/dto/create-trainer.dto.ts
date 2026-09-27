import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Carlos Rodríguez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({
    example: 'Entrenador especializado en acondicionamiento físico',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string;
}
