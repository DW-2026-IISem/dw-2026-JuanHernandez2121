import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_NAME || "ActivaFit",
  process.env.MYSQL_USER || "admin",
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

console.log("🔌 Conectando a la base de datos ActivaFit");

export { sequelize };

export const getDatabaseInfo = () => {
  return {
    project: "ActivaFit ASI",
    engine: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    database: process.env.MYSQL_NAME || "ActivaFit",
    username: process.env.MYSQL_USER || "admin"
  };
};

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos ActivaFit");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos ActivaFit:", error);
    return false;
  }
};
