import { Application } from "express";
import { TrainerController } from "./trainer.controller";
import { authenticate, authorize } from "../../auth/access";

export class TrainerRoutes {
  public trainerController: TrainerController =
    new TrainerController();

  public routes(app: Application): void {
    app
      .route("/api/entrenadores")
      .get(
        authenticate,
        authorize,
        this.trainerController.getAll.bind(
          this.trainerController
        )
      )
      .post(
        authenticate,
        authorize,
        this.trainerController.create.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id")
      .get(
        authenticate,
        authorize,
        this.trainerController.getOne.bind(
          this.trainerController
        )
      )
      .put(
        authenticate,
        authorize,
        this.trainerController.updatePut.bind(
          this.trainerController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.trainerController.updatePatch.bind(
          this.trainerController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.trainerController.deletePhysical.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.trainerController.deleteLogical.bind(
          this.trainerController
        )
      );
  }
}
