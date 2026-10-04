import { Application } from "express";
import { ClientController } from "./client.controller";
import { authenticate, authorize } from "../../auth/access";

export class ClientRoutes {
  public clientController: ClientController =
    new ClientController();

  public routes(app: Application): void {
    app
      .route("/api/clientes")
      .get(
        authenticate,
        authorize,
        this.clientController.getAll.bind(
          this.clientController
        )
      )
      .post(
        authenticate,
        authorize,
        this.clientController.create.bind(
          this.clientController
        )
      );

    app
      .route("/api/clientes/:id")
      .get(
        authenticate,
        authorize,
        this.clientController.getOne.bind(
          this.clientController
        )
      )
      .put(
        authenticate,
        authorize,
        this.clientController.updatePut.bind(
          this.clientController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.clientController.updatePatch.bind(
          this.clientController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.clientController.deletePhysical.bind(
          this.clientController
        )
      );

    app
      .route("/api/clientes/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.clientController.deleteLogical.bind(
          this.clientController
        )
      );
  }
}
