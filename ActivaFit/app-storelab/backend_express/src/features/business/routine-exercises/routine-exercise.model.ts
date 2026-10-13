import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface RoutineExerciseI {
  id?: number;
  rutinaId: number;
  ejercicioId: number;
  datosRelacion?: string | null;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class RoutineExercise extends Model {
  public id!: number;
  public rutinaId!: number;
  public ejercicioId!: number;
  public datosRelacion!: string | null;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoutineExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rutinaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "principal_id",
    },
    ejercicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "relacionado_id",
    },
    datosRelacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "datos_relacion",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "RoutineExercise",
    tableName: "rutina_ejercicios",
    timestamps: true,
  }
);
