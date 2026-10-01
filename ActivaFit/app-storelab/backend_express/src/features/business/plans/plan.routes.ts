import { Application } from "express";
import { PlanController } from "./plan.controller";

export class PlanRoutes {
  public planController: PlanController = new PlanController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll
    app
      .route("/api/planes")
      .get(this.planController.getAll.bind(this.planController));

    // getOne
    app
      .route("/api/planes/:id")
      .get(this.planController.getOne.bind(this.planController));

    // create
    app
      .route("/api/planes")
      .post(this.planController.create.bind(this.planController));

    // update (PUT / PATCH)
    app
      .route("/api/planes/:id")
      .put(this.planController.updatePut.bind(this.planController))
      .patch(this.planController.updatePatch.bind(this.planController));

    // delete físico
    app
      .route("/api/planes/:id")
      .delete(this.planController.deletePhysical.bind(this.planController));

    // delete lógico
    app
      .route("/api/planes/:id/deactivate")
      .patch(this.planController.deleteLogical.bind(this.planController));
  }
}
EOF: > src/features/business/plans/plan.routes.ts
cat >> src/features/business/plans/plan.routes.ts << 'EOF'
import { Application } from "express";
import { PlanController } from "./plan.controller";

export class PlanRoutes {
  public planController: PlanController = new PlanController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll
    app
      .route("/api/planes")
      .get(this.planController.getAll.bind(this.planController));

    // getOne
    app
      .route("/api/planes/:id")
      .get(this.planController.getOne.bind(this.planController));

    // create
    app
      .route("/api/planes")
      .post(this.planController.create.bind(this.planController));

    // update (PUT / PATCH)
    app
      .route("/api/planes/:id")
      .put(this.planController.updatePut.bind(this.planController))
      .patch(this.planController.updatePatch.bind(this.planController));

    // delete físico
    app
      .route("/api/planes/:id")
      .delete(this.planController.deletePhysical.bind(this.planController));

    // delete lógico
    app
      .route("/api/planes/:id/deactivate")
      .patch(this.planController.deleteLogical.bind(this.planController));
  }
}
