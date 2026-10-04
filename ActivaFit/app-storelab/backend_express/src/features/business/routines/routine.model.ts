import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface RoutineI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Routine extends Model<RoutineI> implements RoutineI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Routine.init(
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

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Routine",
    tableName: "rutinas",
    timestamps: true,
  }
);
