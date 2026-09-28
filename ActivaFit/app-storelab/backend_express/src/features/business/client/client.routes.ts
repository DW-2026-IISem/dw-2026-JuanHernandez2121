import { Application } from "express";
import { ClientController } from "./client.controller";

export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/clientes")
      .get(this.clientController.getAll.bind(this.clientController));

    // getOne
    app
      .route("/api/clientes/:id")
      .get(this.clientController.getOne.bind(this.clientController));
  }
}
