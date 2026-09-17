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
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';
import { MembershipModel } from '../../../../memberships/infrastructure/persistence/models/membership.model';

@Table({ tableName: 'payments' })
export class PaymentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare monto: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare fechaPago: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare metodoPago: string;

  @ForeignKey(() => MembershipModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare membresiaId: number;

  @BelongsTo(() => MembershipModel)
  declare membresia: MembershipModel;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
    defaultValue: PaymentStatus.PENDING,
  })
  declare status: PaymentStatus;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
