import { Application } from "express";
import { RoutineExerciseController } from "./routine-exercise.controller";
import { authenticate, authorize } from "../../auth/access";

export class RoutineExerciseRoutes {
  public routineExerciseController: RoutineExerciseController =
    new RoutineExerciseController();

  public routes(app: Application): void {
    app
      .route("/api/rutina-ejercicios")
      .get(
        authenticate,
        authorize,
        this.routineExerciseController.getAll.bind(
          this.routineExerciseController
        )
      )
      .post(
        authenticate,
        authorize,
        this.routineExerciseController.create.bind(
          this.routineExerciseController
        )
      );

    app
      .route("/api/rutina-ejercicios/:id")
      .get(
        authenticate,
        authorize,
        this.routineExerciseController.getOne.bind(
          this.routineExerciseController
        )
      )
      .put(
        authenticate,
        authorize,
        this.routineExerciseController.updatePut.bind(
          this.routineExerciseController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.routineExerciseController.updatePatch.bind(
          this.routineExerciseController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.routineExerciseController.deletePhysical.bind(
          this.routineExerciseController
        )
      );

    app
      .route("/api/rutina-ejercicios/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.routineExerciseController.deleteLogical.bind(
          this.routineExerciseController
        )
      );
  }
}
