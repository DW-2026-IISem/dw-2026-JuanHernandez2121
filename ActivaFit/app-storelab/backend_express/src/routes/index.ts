import { ClientRoutes } from "../features/business/client/client.routes";
import { PlanRoutes } from "../features/business/plans/plan.routes";
import { MembershipRoutes } from "../features/business/membership/membership.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public planRoutes: PlanRoutes = new PlanRoutes();
  public membershipRoutes: MembershipRoutes = new MembershipRoutes();
}
