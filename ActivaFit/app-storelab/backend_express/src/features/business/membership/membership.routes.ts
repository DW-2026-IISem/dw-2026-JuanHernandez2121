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
        authenticate,
        authorize,
        this.membershipController.getAll.bind(
          this.membershipController
        )
      )
      .post(
        authenticate,
        authorize,
        this.membershipController.create.bind(
          this.membershipController
        )
      );

    app
      .route("/api/membresias/:id")
      .get(
        authenticate,
        authorize,
        this.membershipController.getOne.bind(
          this.membershipController
        )
      )
      .put(
        authenticate,
        authorize,
        this.membershipController.updatePut.bind(
          this.membershipController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.membershipController.updatePatch.bind(
          this.membershipController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.membershipController.deletePhysical.bind(
          this.membershipController
        )
      );

    app
      .route("/api/membresias/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.membershipController.deleteLogical.bind(
          this.membershipController
        )
      );
  }
}
