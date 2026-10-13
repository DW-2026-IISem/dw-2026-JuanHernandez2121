import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface AttendanceI {
  id?: number;
  membresiaId: number;
  fecha: Date;
  observaciones?: string | null;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Attendance extends Model {
  public id!: number;
  public membresiaId!: number;
  public fecha!: Date;
  public observaciones!: string | null;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    membresiaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "membresiaId",
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    tableName: "asistencias",
    timestamps: true,
  }
);
