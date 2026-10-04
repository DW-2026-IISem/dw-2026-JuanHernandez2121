import { Application } from "express";
import { RefreshTokensController } from "./refresh-tokens.controller";
import { authenticate } from "../access";

export class RefreshTokensRoutes {
  public refreshTokensController: RefreshTokensController =
    new RefreshTokensController();

  public routes(app: Application): void {
    // Listar sesiones propias
    app
      .route("/api/sesiones")
      .get(
        authenticate,
        this.refreshTokensController.getAll.bind(
          this.refreshTokensController
        )
      );

    // Revocar todas las sesiones propias
    // Se registra antes de las rutas parametrizadas.
    app
      .route("/api/sesiones/deactivate-all")
      .patch(
        authenticate,
        this.refreshTokensController.revokeAll.bind(
          this.refreshTokensController
        )
      );

    // Consultar una sesión propia
    app
      .route("/api/sesiones/:id")
      .get(
        authenticate,
        this.refreshTokensController.getOne.bind(
          this.refreshTokensController
        )
      );

    // Revocar una sesión propia
    app
      .route("/api/sesiones/:id/deactivate")
      .patch(
        authenticate,
        this.refreshTokensController.revokeOne.bind(
          this.refreshTokensController
        )
      );

    // Purgar sesiones inactivas o expiradas
    app
      .route("/api/sesiones")
      .delete(
        authenticate,
        this.refreshTokensController.purge.bind(
          this.refreshTokensController
        )
      );
  }
}
