import { Application } from "express";
import { MeasurementController } from "./measurement.controller";

export class MeasurementRoutes {
  public measurementController: MeasurementController =
    new MeasurementController();

  public routes(app: Application): void {
    app
      .route("/api/mediciones")
      .get(
        this.measurementController.getAll.bind(
          this.measurementController
        )
      );

    app
      .route("/api/mediciones/:id")
      .get(
        this.measurementController.getOne.bind(
          this.measurementController
        )
      );

    app
      .route("/api/mediciones")
      .post(
        this.measurementController.create.bind(
          this.measurementController
        )
      );

    app
      .route("/api/mediciones/:id")
      .put(
        this.measurementController.updatePut.bind(
          this.measurementController
        )
      )
      .patch(
        this.measurementController.updatePatch.bind(
          this.measurementController
        )
      );

    app
      .route("/api/mediciones/:id")
      .delete(
        this.measurementController.deletePhysical.bind(
          this.measurementController
        )
      );
  }
}
