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
import { TrainerModel } from '../../../../trainers/infrastructure/persistence/models/trainer.model';
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model';

@Table({ tableName: 'routines' })
export class RoutineModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare descripcion: string | null;

  @ForeignKey(() => TrainerModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare entrenadorId: number;

  @BelongsTo(() => TrainerModel)
  declare entrenador: TrainerModel;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare clienteId: number;

  @BelongsTo(() => ClientModel)
  declare cliente: ClientModel;

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
}
