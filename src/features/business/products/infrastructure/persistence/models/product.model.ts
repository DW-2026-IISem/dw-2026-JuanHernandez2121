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

import { Status } from '../../../../../../common/enums/status.enum.js';

import { ProductTypeModel } from '../../../../product-types/infrastructure/persistence/models/product-type.model.js';

@Table({ tableName: 'products' })
export class ProductModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare brand: string;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare minStock: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare quantity: number;

  @ForeignKey(() => ProductTypeModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productTypeId: number;

  @BelongsTo(() => ProductTypeModel)
  declare productType: ProductTypeModel;

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
