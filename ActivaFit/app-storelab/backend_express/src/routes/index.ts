import { ClientRoutes } from "../features/business/client/client.routes";
import { PlanRoutes } from "../features/business/plans/plan.routes";
import { MembershipRoutes } from "../features/business/membership/membership.routes";
import { TrainerRoutes } from "../features/business/trainers/trainer.routes";
import { RoutineRoutes } from "../features/business/routines/routine.routes";
import { ExerciseRoutes } from "../features/business/exercises/exercise.routes";
import { MeasurementRoutes } from "../features/business/measurements/measurement.routes";
import { UsersRoutes } from "../features/auth/users/users.routes";
import { RefreshTokensRoutes } from "../features/auth/refresh-tokens/refresh-tokens.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();

  public planRoutes: PlanRoutes = new PlanRoutes();

  public membershipRoutes: MembershipRoutes =
    new MembershipRoutes();

  public trainerRoutes: TrainerRoutes =
    new TrainerRoutes();

  public routineRoutes: RoutineRoutes =
    new RoutineRoutes();

  public exerciseRoutes: ExerciseRoutes =
    new ExerciseRoutes();

  public measurementRoutes: MeasurementRoutes =
    new MeasurementRoutes();

  public usersRoutes: UsersRoutes =
    new UsersRoutes();

  public refreshTokensRoutes: RefreshTokensRoutes =
    new RefreshTokensRoutes();
}
