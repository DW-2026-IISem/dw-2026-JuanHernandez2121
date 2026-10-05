import { Application } from "express";
import { SessionController } from "./session.controller";
import { authenticate } from "../access";

/**
 * Rutas del feature Session — las tres modalidades en un solo archivo.
 *
 * POST /api/sesion/login   -> OPEN
 * POST /api/sesion/refresh -> OPEN + refresh token
 * POST /api/sesion/logout  -> OPEN + refresh token
 * GET  /api/sesion/perfil  -> JWT
 * GET  /api/permisos       -> JWT
 *
 * Ninguna ruta usa authorize.
 */
export class SessionRoutes {
  public sessionController: SessionController = new SessionController();

  public routes(app: Application): void {
    // Login (OPEN)
    app
      .route("/api/sesion/login")
      .post(this.sessionController.login.bind(this.sessionController));

    // Refresh (OPEN + refresh token)
    app
      .route("/api/sesion/refresh")
      .post(this.sessionController.refresh.bind(this.sessionController));

    // Logout (OPEN + refresh token)
    app
      .route("/api/sesion/logout")
      .post(this.sessionController.logout.bind(this.sessionController));

    // Perfil (JWT)
    app
      .route("/api/sesion/perfil")
      .get(
        authenticate,
        this.sessionController.profile.bind(this.sessionController)
      );

    // Permisos efectivos (JWT)
    app
      .route("/api/permisos")
      .get(
        authenticate,
        this.sessionController.myPermissions.bind(this.sessionController)
      );
  }
}
