import { Application } from "express";
import { ExerciseController } from "./exercise.controller";

export class ExerciseRoutes {
  public exerciseController: ExerciseController =
    new ExerciseController();

  public routes(app: Application): void {
    app
      .route("/api/ejercicios")
      .get(this.exerciseController.getAll.bind(this.exerciseController));

    app
      .route("/api/ejercicios/:id")
      .get(this.exerciseController.getOne.bind(this.exerciseController));

    app
      .route("/api/ejercicios")
      .post(this.exerciseController.create.bind(this.exerciseController));

    app
      .route("/api/ejercicios/:id")
      .put(this.exerciseController.updatePut.bind(this.exerciseController))
      .patch(this.exerciseController.updatePatch.bind(this.exerciseController));

    app
      .route("/api/ejercicios/:id")
      .delete(
        this.exerciseController.deletePhysical.bind(
          this.exerciseController
        )
      );

    app
      .route("/api/ejercicios/:id/deactivate")
      .patch(
        this.exerciseController.deleteLogical.bind(
          this.exerciseController
        )
      );
  }
}
