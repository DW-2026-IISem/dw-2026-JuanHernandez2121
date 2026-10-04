import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface MeasurementI {
  id?: number;
  clienteId: number;
  peso: number;
  altura: number;
  imc: number;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Measurement extends Model<MeasurementI> implements MeasurementI {
  public id!: number;
  public clienteId!: number;
  public peso!: number;
  public altura!: number;
  public imc!: number;
  public fecha!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Measurement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "clienteId",
    },
    peso: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    altura: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    imc: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Measurement",
    tableName: "mediciones",
    timestamps: true,
  }
);
