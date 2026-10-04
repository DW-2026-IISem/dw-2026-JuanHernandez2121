import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ExerciseI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  tipo: string;
  nivel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Exercise extends Model<ExerciseI> implements ExerciseI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public tipo!: string;
  public nivel!: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Exercise.init(
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
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nivel: {
      type: DataTypes.ENUM(
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED"
      ),
      allowNull: false,
      defaultValue: "BEGINNER",
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Exercise",
    tableName: "ejercicios",
    timestamps: true,
  }
);
