import { Application } from "express";
import { ExerciseController } from "./exercise.controller";
import { authenticate, authorize } from "../../auth/access";

export class ExerciseRoutes {
  public exerciseController: ExerciseController =
    new ExerciseController();

  public routes(app: Application): void {
    app
      .route("/api/ejercicios")
      .get(
        authenticate,
        authorize,
        this.exerciseController.getAll.bind(
          this.exerciseController
        )
      )
      .post(
        authenticate,
        authorize,
        this.exerciseController.create.bind(
          this.exerciseController
        )
      );

    app
      .route("/api/ejercicios/:id")
      .get(
        authenticate,
        authorize,
        this.exerciseController.getOne.bind(
          this.exerciseController
        )
      )
      .put(
        authenticate,
        authorize,
        this.exerciseController.updatePut.bind(
          this.exerciseController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.exerciseController.updatePatch.bind(
          this.exerciseController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.exerciseController.deletePhysical.bind(
          this.exerciseController
        )
      );

    app
      .route("/api/ejercicios/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.exerciseController.deleteLogical.bind(
          this.exerciseController
        )
      );
  }
}
