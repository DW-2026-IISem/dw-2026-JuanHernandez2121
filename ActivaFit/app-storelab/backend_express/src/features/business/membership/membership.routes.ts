import { Application } from "express";
import { MembershipController } from "./membership.controller";

export class MembershipRoutes {
  public membershipController: MembershipController =
    new MembershipController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll
    app
      .route("/api/membresias")
      .get(
        this.membershipController.getAll.bind(
          this.membershipController
        )
      );

    // getOne
    app
      .route("/api/membresias/:id")
      .get(
        this.membershipController.getOne.bind(
          this.membershipController
        )
      );

    // create
    app
      .route("/api/membresias")
      .post(
        this.membershipController.create.bind(
          this.membershipController
        )
      );

    // update PUT / PATCH
    app
      .route("/api/membresias/:id")
      .put(
        this.membershipController.updatePut.bind(
          this.membershipController
        )
      )
      .patch(
        this.membershipController.updatePatch.bind(
          this.membershipController
        )
      );

    // delete físico
    app
      .route("/api/membresias/:id")
      .delete(
        this.membershipController.deletePhysical.bind(
          this.membershipController
        )
      );

    // delete lógico
    app
      .route("/api/membresias/:id/deactivate")
      .patch(
        this.membershipController.deleteLogical.bind(
          this.membershipController
        )
      );
  }
}
