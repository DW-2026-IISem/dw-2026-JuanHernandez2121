import { Application } from "express";
import { MembershipController } from "./membership.controller";
import { authenticate, authorize } from "../../auth/access";

export class MembershipRoutes {
  public membershipController: MembershipController =
    new MembershipController();

  public routes(app: Application): void {
    app
      .route("/api/membresias")
      .get(
        this.membershipController.getAll.bind(
          this.membershipController
        )
      )
      .post(
        this.membershipController.create.bind(
          this.membershipController
        )
      );

    app
      .route("/api/membresias/:id")
      .get(
        this.membershipController.getOne.bind(
          this.membershipController
        )
      )
      .put(
        this.membershipController.updatePut.bind(
          this.membershipController
        )
      )
      .patch(
        this.membershipController.updatePatch.bind(
          this.membershipController
        )
      )
      .delete(
        this.membershipController.deletePhysical.bind(
          this.membershipController
        )
      );

    app
      .route("/api/membresias/:id/deactivate")
      .patch(
        this.membershipController.deleteLogical.bind(
          this.membershipController
        )
      );
  }
}
