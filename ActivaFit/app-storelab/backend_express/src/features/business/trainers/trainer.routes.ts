import { Application } from "express";
import { TrainerController } from "./trainer.controller";

export class TrainerRoutes {
  public trainerController: TrainerController =
    new TrainerController();

  public routes(app: Application): void {
    app
      .route("/api/entrenadores")
      .get(
        this.trainerController.getAll.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id")
      .get(
        this.trainerController.getOne.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores")
      .post(
        this.trainerController.create.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id")
      .put(
        this.trainerController.updatePut.bind(
          this.trainerController
        )
      )
      .patch(
        this.trainerController.updatePatch.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id")
      .delete(
        this.trainerController.deletePhysical.bind(
          this.trainerController
        )
      );

    app
      .route("/api/entrenadores/:id/deactivate")
      .patch(
        this.trainerController.deleteLogical.bind(
          this.trainerController
        )
      );
  }
}
