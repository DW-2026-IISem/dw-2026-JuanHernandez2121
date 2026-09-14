import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreateAttendanceDto } from '../../../application/dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../../../application/dto/update-attendance.dto';
import { AttendanceFilterDto } from '../../../application/dto/attendance-filter.dto';
import { AttendanceResponseDto } from '../../../application/dto/attendance-response.dto';
import { CreateAttendanceUseCase } from '../../../application/use-cases/create-attendance.use-case';
import { UpdateAttendanceUseCase } from '../../../application/use-cases/update-attendance.use-case';
import { DeleteAttendanceUseCase } from '../../../application/use-cases/delete-attendance.use-case';
import { GetAttendanceUseCase } from '../../../application/use-cases/get-attendance.use-case';
import { ListAttendancesUseCase } from '../../../application/use-cases/list-attendances.use-case';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly createAttendanceUseCase: CreateAttendanceUseCase,
    private readonly updateAttendanceUseCase: UpdateAttendanceUseCase,
    private readonly deleteAttendanceUseCase: DeleteAttendanceUseCase,
    private readonly getAttendanceUseCase: GetAttendanceUseCase,
    private readonly listAttendancesUseCase: ListAttendancesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una asistencia' })
  @ApiCreatedResponse({ type: AttendanceResponseDto })
  create(@Body() dto: CreateAttendanceDto) {
    return this.createAttendanceUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar asistencias' })
  @ApiOkResponse({ type: [AttendanceResponseDto] })
  findAll(@Query() filter: AttendanceFilterDto) {
    return this.listAttendancesUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asistencia por ID' })
  @ApiOkResponse({ type: AttendanceResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getAttendanceUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una asistencia' })
  @ApiOkResponse({ type: AttendanceResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateAttendanceDto,
  ) {
    return this.updateAttendanceUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una asistencia' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteAttendanceUseCase.execute(id);
  }
}
