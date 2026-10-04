import { Application } from "express";
import { MeasurementController } from "./measurement.controller";
import { authenticate, authorize } from "../../auth/access";

export class MeasurementRoutes {
  public measurementController: MeasurementController =
    new MeasurementController();

  public routes(app: Application): void {
    app
      .route("/api/mediciones")
      .get(
        authenticate,
        authorize,
        this.measurementController.getAll.bind(
          this.measurementController
        )
      )
      .post(
        authenticate,
        authorize,
        this.measurementController.create.bind(
          this.measurementController
        )
      );

    app
      .route("/api/mediciones/:id")
      .get(
        authenticate,
        authorize,
        this.measurementController.getOne.bind(
          this.measurementController
        )
      )
      .put(
        authenticate,
        authorize,
        this.measurementController.updatePut.bind(
          this.measurementController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.measurementController.updatePatch.bind(
          this.measurementController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.measurementController.deletePhysical.bind(
          this.measurementController
        )
      );
  }
}
