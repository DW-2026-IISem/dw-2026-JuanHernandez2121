import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 150000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  monto: number;

  @ApiProperty({ example: '2026-09-17' })
  @IsDateString()
  fechaPago: string;

  @ApiProperty({ example: 'transferencia' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  metodoPago: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  membresiaId: number;
}
