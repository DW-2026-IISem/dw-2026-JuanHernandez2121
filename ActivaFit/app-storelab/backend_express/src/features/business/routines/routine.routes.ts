import { Application } from "express";
import { RoutineController } from "./routine.controller";

export class RoutineRoutes {
  public routineController: RoutineController =
    new RoutineController();

  public routes(app: Application): void {
    app
      .route("/api/rutinas")
      .get(
        this.routineController.getAll.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id")
      .get(
        this.routineController.getOne.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas")
      .post(
        this.routineController.create.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id")
      .put(
        this.routineController.updatePut.bind(
          this.routineController
        )
      )
      .patch(
        this.routineController.updatePatch.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id")
      .delete(
        this.routineController.deletePhysical.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id/deactivate")
      .patch(
        this.routineController.deleteLogical.bind(
          this.routineController
        )
      );
  }
}
