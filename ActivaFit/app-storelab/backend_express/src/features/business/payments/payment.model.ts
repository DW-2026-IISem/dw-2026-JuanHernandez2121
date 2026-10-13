import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export type PaymentReferenceType = "MEMBRESIA";
export type PaymentStatus = "PENDIENTE" | "PAGADO" | "ANULADO";

export interface PaymentI {
  id?: number;
  referenciaTipo: PaymentReferenceType;
  referenciaId: number;
  metodo: string;
  monto: number;
  fecha: Date;
  estado: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment extends Model {
  public id!: number;
  public referenciaTipo!: PaymentReferenceType;
  public referenciaId!: number;
  public metodo!: string;
  public monto!: number;
  public fecha!: Date;
  public estado!: PaymentStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    referenciaTipo: {
      type: DataTypes.ENUM("MEMBRESIA"),
      allowNull: false,
      defaultValue: "MEMBRESIA",
      field: "referencia_tipo",
    },
    referenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "referencia_id",
    },
    metodo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("PENDIENTE", "PAGADO", "ANULADO"),
      allowNull: false,
      defaultValue: "PENDIENTE",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "pagos",
    timestamps: true,
  }
);
