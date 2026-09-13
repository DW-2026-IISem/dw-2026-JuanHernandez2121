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
import { CreatePlanDto } from '../../../application/dto/create-plan.dto';
import { UpdatePlanDto } from '../../../application/dto/update-plan.dto';
import { PlanFilterDto } from '../../../application/dto/plan-filter.dto';
import { PlanResponseDto } from '../../../application/dto/plan-response.dto';
import { CreatePlanUseCase } from '../../../application/use-cases/create-plan.use-case';
import { UpdatePlanUseCase } from '../../../application/use-cases/update-plan.use-case';
import { DeletePlanUseCase } from '../../../application/use-cases/delete-plan.use-case';
import { GetPlanUseCase } from '../../../application/use-cases/get-plan.use-case';
import { ListPlansUseCase } from '../../../application/use-cases/list-plans.use-case';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
    private readonly getPlanUseCase: GetPlanUseCase,
    private readonly listPlansUseCase: ListPlansUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un plan' })
  @ApiCreatedResponse({ type: PlanResponseDto })
  create(@Body() dto: CreatePlanDto) {
    return this.createPlanUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar planes' })
  @ApiOkResponse({ type: [PlanResponseDto] })
  findAll(@Query() filter: PlanFilterDto) {
    return this.listPlansUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plan por ID' })
  @ApiOkResponse({ type: PlanResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getPlanUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plan' })
  @ApiOkResponse({ type: PlanResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.updatePlanUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un plan' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deletePlanUseCase.execute(id);
  }
}
