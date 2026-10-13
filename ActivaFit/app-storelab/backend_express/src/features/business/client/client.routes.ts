import { Application } from "express";
import { ClientController } from "./client.controller";
import { authenticate, authorize } from "../../auth/access";

export class ClientRoutes {
  public clientController: ClientController =
    new ClientController();

  public routes(app: Application): void {
    app
      .route("/api/clientes")
      .get(this.clientController.getAll.bind(
          this.clientController
        )
      )
      .post(this.clientController.create.bind(
          this.clientController
        )
      );

    app
      .route("/api/clientes/:id")
      .get(this.clientController.getOne.bind(
          this.clientController
        )
      )
      .put(this.clientController.updatePut.bind(
          this.clientController
        )
      )
      .patch(this.clientController.updatePatch.bind(
          this.clientController
        )
      )
      .delete(this.clientController.deletePhysical.bind(
          this.clientController
        )
      );

    app
      .route("/api/clientes/:id/deactivate")
      .patch(this.clientController.deleteLogical.bind(
          this.clientController
        )
      );
  }
}
