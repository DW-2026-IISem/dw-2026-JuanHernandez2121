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
import { CreateTrainerDto } from '../../../application/dto/create-trainer.dto';
import { UpdateTrainerDto } from '../../../application/dto/update-trainer.dto';
import { TrainerFilterDto } from '../../../application/dto/trainer-filter.dto';
import { TrainerResponseDto } from '../../../application/dto/trainer-response.dto';
import { CreateTrainerUseCase } from '../../../application/use-cases/create-trainer.use-case';
import { UpdateTrainerUseCase } from '../../../application/use-cases/update-trainer.use-case';
import { DeleteTrainerUseCase } from '../../../application/use-cases/delete-trainer.use-case';
import { GetTrainerUseCase } from '../../../application/use-cases/get-trainer.use-case';
import { ListTrainersUseCase } from '../../../application/use-cases/list-trainers.use-case';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainersController {
  constructor(
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly updateTrainerUseCase: UpdateTrainerUseCase,
    private readonly deleteTrainerUseCase: DeleteTrainerUseCase,
    private readonly getTrainerUseCase: GetTrainerUseCase,
    private readonly listTrainersUseCase: ListTrainersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un entrenador' })
  @ApiCreatedResponse({ type: TrainerResponseDto })
  create(@Body() dto: CreateTrainerDto) {
    return this.createTrainerUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar entrenadores' })
  @ApiOkResponse({ type: [TrainerResponseDto] })
  findAll(@Query() filter: TrainerFilterDto) {
    return this.listTrainersUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un entrenador por ID' })
  @ApiOkResponse({ type: TrainerResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getTrainerUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un entrenador' })
  @ApiOkResponse({ type: TrainerResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateTrainerDto,
  ) {
    return this.updateTrainerUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un entrenador' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteTrainerUseCase.execute(id);
  }
}
