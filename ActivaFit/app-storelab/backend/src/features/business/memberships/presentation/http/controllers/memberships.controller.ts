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
import { CreateMembershipDto } from '../../../application/dto/create-membership.dto';
import { UpdateMembershipDto } from '../../../application/dto/update-membership.dto';
import { MembershipFilterDto } from '../../../application/dto/membership-filter.dto';
import { MembershipResponseDto } from '../../../application/dto/membership-response.dto';
import { CreateMembershipUseCase } from '../../../application/use-cases/create-membership.use-case';
import { UpdateMembershipUseCase } from '../../../application/use-cases/update-membership.use-case';
import { DeleteMembershipUseCase } from '../../../application/use-cases/delete-membership.use-case';
import { GetMembershipUseCase } from '../../../application/use-cases/get-membership.use-case';
import { ListMembershipsUseCase } from '../../../application/use-cases/list-memberships.use-case';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(
    private readonly createMembershipUseCase: CreateMembershipUseCase,
    private readonly updateMembershipUseCase: UpdateMembershipUseCase,
    private readonly deleteMembershipUseCase: DeleteMembershipUseCase,
    private readonly getMembershipUseCase: GetMembershipUseCase,
    private readonly listMembershipsUseCase: ListMembershipsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una membresía' })
  @ApiCreatedResponse({ type: MembershipResponseDto })
  create(@Body() dto: CreateMembershipDto) {
    return this.createMembershipUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar membresías' })
  @ApiOkResponse({ type: [MembershipResponseDto] })
  findAll(@Query() filter: MembershipFilterDto) {
    return this.listMembershipsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una membresía por ID' })
  @ApiOkResponse({ type: MembershipResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getMembershipUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una membresía' })
  @ApiOkResponse({ type: MembershipResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateMembershipDto,
  ) {
    return this.updateMembershipUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una membresía' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteMembershipUseCase.execute(id);
  }
}
