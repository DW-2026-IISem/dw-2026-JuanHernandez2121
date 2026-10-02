import { Application } from "express";
import { PlanController } from "./plan.controller";

export class PlanRoutes {
  public planController: PlanController = new PlanController();

  public routes(app: Application): void {
    app
      .route("/api/planes")
      .get(this.planController.getAll.bind(this.planController));

    app
      .route("/api/planes/:id")
      .get(this.planController.getOne.bind(this.planController));

    app
      .route("/api/planes")
      .post(this.planController.create.bind(this.planController));

    app
      .route("/api/planes/:id")
      .put(this.planController.updatePut.bind(this.planController))
      .patch(this.planController.updatePatch.bind(this.planController));

    app
      .route("/api/planes/:id")
      .delete(this.planController.deletePhysical.bind(this.planController));

    app
      .route("/api/planes/:id/deactivate")
      .patch(this.planController.deleteLogical.bind(this.planController));
  }
}
