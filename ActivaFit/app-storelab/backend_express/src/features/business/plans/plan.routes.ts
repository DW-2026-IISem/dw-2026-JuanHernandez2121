import { Application } from "express";
import { PlanController } from "./plan.controller";
import { authenticate, authorize } from "../../auth/access";

export class PlanRoutes {
  public planController: PlanController =
    new PlanController();

  public routes(app: Application): void {
    app
      .route("/api/planes")
      .get(
        authenticate,
        authorize,
        this.planController.getAll.bind(
          this.planController
        )
      )
      .post(
        authenticate,
        authorize,
        this.planController.create.bind(
          this.planController
        )
      );

    app
      .route("/api/planes/:id")
      .get(
        authenticate,
        authorize,
        this.planController.getOne.bind(
          this.planController
        )
      )
      .put(
        authenticate,
        authorize,
        this.planController.updatePut.bind(
          this.planController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.planController.updatePatch.bind(
          this.planController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.planController.deletePhysical.bind(
          this.planController
        )
      );

    app
      .route("/api/planes/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.planController.deleteLogical.bind(
          this.planController
        )
      );
  }
}
