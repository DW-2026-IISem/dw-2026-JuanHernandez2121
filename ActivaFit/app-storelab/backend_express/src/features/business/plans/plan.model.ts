import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PlanI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Plan extends Model<PlanI> implements PlanI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "isActive",
    },
  },
  {
    sequelize,
    modelName: "Plan",
    tableName: "planes",
    timestamps: true,
  }
);
