import { Application } from "express";
import { AttendanceController } from "./attendance.controller";
import { authenticate, authorize } from "../../auth/access";

export class AttendanceRoutes {
  public attendanceController: AttendanceController =
    new AttendanceController();

  public routes(app: Application): void {
    app
      .route("/api/asistencias")
      .get(
        authenticate,
        authorize,
        this.attendanceController.getAll.bind(this.attendanceController)
      )
      .post(
        authenticate,
        authorize,
        this.attendanceController.create.bind(this.attendanceController)
      );

    app
      .route("/api/asistencias/:id")
      .get(
        authenticate,
        authorize,
        this.attendanceController.getOne.bind(this.attendanceController)
      )
      .put(
        authenticate,
        authorize,
        this.attendanceController.updatePut.bind(this.attendanceController)
      )
      .patch(
        authenticate,
        authorize,
        this.attendanceController.updatePatch.bind(this.attendanceController)
      )
      .delete(
        authenticate,
        authorize,
        this.attendanceController.deletePhysical.bind(this.attendanceController)
      );

    app
      .route("/api/asistencias/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.attendanceController.deleteLogical.bind(this.attendanceController)
      );
  }
}
