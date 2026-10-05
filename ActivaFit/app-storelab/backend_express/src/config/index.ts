import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
var cors = require("cors");

import {
  sequelize,
  getDatabaseInfo,
  testConnection,
} from "../database/db";

// Business - modelos
import "../features/business/client/client.model";
import "../features/business/plans/plan.model";
import "../features/business/membership/membership.model";
import "../features/business/trainers/trainer.model";
import "../features/business/routines/routine.model";
import "../features/business/exercises/exercise.model";
import "../features/business/measurements/measurement.model";

// Auth - modelos
import "../features/auth/users/user.model";
import "../features/auth/roles/role.model";
import "../features/auth/resources/resource.model";
import "../features/auth/role-users/role-user.model";
import "../features/auth/resource-roles/resource-role.model";
import "../features/auth/refresh-tokens/refresh-token.model";

// Auth - asociaciones
import "../features/auth/rbac.associations";

import { Routes } from "../routes/index";
import { setupSwagger } from "../swagger/index";

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.docs();
    this.errorHandling();
  }

  private settings(): void {
    this.app.set(
      "port",
      this.port || process.env.PORT || 4000
    );
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
  }

  private routes(): void {
    // Fase I — Business
    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.planRoutes.routes(this.app);
    this.routePrv.membershipRoutes.routes(this.app);
    this.routePrv.trainerRoutes.routes(this.app);
    this.routePrv.routineRoutes.routes(this.app);
    this.routePrv.exerciseRoutes.routes(this.app);
    this.routePrv.measurementRoutes.routes(this.app);
    this.routePrv.usersRoutes.routes(this.app);
    this.routePrv.refreshTokensRoutes.routes(this.app);
    this.routePrv.sessionRoutes.routes(this.app);
  }

  private docs(): void {
    setupSwagger(this.app);
  }

  private errorHandling(): void {
    const bodyErrorHandler: ErrorRequestHandler = (
      err,
      _req,
      res,
      next
    ) => {
      if (
        err instanceof SyntaxError &&
        "body" in err
      ) {
        res.status(400).json({
          error: "Malformed JSON body",
        });
        return;
      }

      next(err);
    };

    this.app.use(bodyErrorHandler);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();

      console.log(
        `🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`
      );

      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(
          `No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`
        );
      }

      const force =
        process.env.DB_SYNC_FORCE === "true";

      const isMysql =
        sequelize.getDialect() === "mysql" ||
        sequelize.getDialect() === "mariadb";

      if (isMysql) {
        await sequelize.query(
          "SET FOREIGN_KEY_CHECKS = 0"
        );
      }

      try {
        await sequelize.sync({
          force,
          alter: !force,
        });
      } finally {
        if (isMysql) {
          await sequelize.query(
            "SET FOREIGN_KEY_CHECKS = 1"
          );
        }
      }

      console.log(
        force
          ? "📦 Base de datos recreada (DB_SYNC_FORCE=true)"
          : "📦 Base de datos sincronizada exitosamente"
      );
    } catch (error) {
      console.error(
        "❌ Error al conectar con la base de datos:",
        error
      );

      process.exit(1);
    }
  }

  async listen() {
    await this.dbConnection();

    await this.app.listen(
      this.app.get("port")
    );

    console.log(
      `🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`
    );
  }
}
