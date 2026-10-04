import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface MembershipI {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  planId: number;
  clienteId: number;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Membership extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public planId!: number;
  public clienteId!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Membership.init(
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

    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "planId",
    },

    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "clienteId",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Membership",
    tableName: "membresias",
    timestamps: true,
  }
);
