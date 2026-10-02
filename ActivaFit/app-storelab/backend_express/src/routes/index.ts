import { ClientRoutes } from "../features/business/client/client.routes";
import { PlanRoutes } from "../features/business/plans/plan.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public planRoutes: PlanRoutes = new PlanRoutes();
}
