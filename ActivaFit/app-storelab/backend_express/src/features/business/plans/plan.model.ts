import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PlanI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  duracion: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Plan extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public precio!: number;
  public duracion!: number;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plan.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Plan",
    tableName: "plans",
    timestamps: true,
  }
);
