import { Application } from "express";
import { RoutineController } from "./routine.controller";
import { authenticate, authorize } from "../../auth/access";

export class RoutineRoutes {
  public routineController: RoutineController =
    new RoutineController();

  public routes(app: Application): void {
    app
      .route("/api/rutinas")
      .get(
        authenticate,
        authorize,
        this.routineController.getAll.bind(
          this.routineController
        )
      )
      .post(
        authenticate,
        authorize,
        this.routineController.create.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id")
      .get(
        authenticate,
        authorize,
        this.routineController.getOne.bind(
          this.routineController
        )
      )
      .put(
        authenticate,
        authorize,
        this.routineController.updatePut.bind(
          this.routineController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.routineController.updatePatch.bind(
          this.routineController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.routineController.deletePhysical.bind(
          this.routineController
        )
      );

    app
      .route("/api/rutinas/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.routineController.deleteLogical.bind(
          this.routineController
        )
      );
  }
}
