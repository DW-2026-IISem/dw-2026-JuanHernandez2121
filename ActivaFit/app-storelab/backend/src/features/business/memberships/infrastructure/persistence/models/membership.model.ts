import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum';
import { PlanModel } from '../../../../plans/infrastructure/persistence/models/plan.model';
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model';

@Table({ tableName: 'membresias' })
export class MembershipModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare descripcion: string | null;

  @ForeignKey(() => PlanModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare planId: number;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare clienteId: number;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  declare status: Status;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => PlanModel)
  declare plan: PlanModel;

  @BelongsTo(() => ClientModel)
  declare cliente: ClientModel;
}
