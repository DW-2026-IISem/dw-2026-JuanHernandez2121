import { ClientRoutes } from "../features/business/client/client.routes";
import { PlanRoutes } from "../features/business/plans/plan.routes";
import { MembershipRoutes } from "../features/business/membership/membership.routes";
import { AttendanceRoutes } from "../features/business/attendances/attendance.routes";
import { TrainerRoutes } from "../features/business/trainers/trainer.routes";
import { RoutineRoutes } from "../features/business/routines/routine.routes";
import { ExerciseRoutes } from "../features/business/exercises/exercise.routes";
import { RoutineExerciseRoutes } from "../features/business/routine-exercises/routine-exercise.routes";
import { MeasurementRoutes } from "../features/business/measurements/measurement.routes";
import { PaymentRoutes } from "../features/business/payments/payment.routes";
import { UsersRoutes } from "../features/auth/users/users.routes";
import { RolesRoutes } from "../features/auth/roles/roles.routes";
import { ResourcesRoutes } from "../features/auth/resources/resources.routes";
import { RoleUsersRoutes } from "../features/auth/role-users/role-users.routes";
import { ResourceRolesRoutes } from "../features/auth/resource-roles/resource-roles.routes";
import { RefreshTokensRoutes } from "../features/auth/refresh-tokens/refresh-tokens.routes";
import { SessionRoutes } from "../features/auth/session/session.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public planRoutes: PlanRoutes = new PlanRoutes();
  public membershipRoutes: MembershipRoutes = new MembershipRoutes();
  public attendanceRoutes: AttendanceRoutes = new AttendanceRoutes();
  public trainerRoutes: TrainerRoutes = new TrainerRoutes();
  public routineRoutes: RoutineRoutes = new RoutineRoutes();
  public exerciseRoutes: ExerciseRoutes = new ExerciseRoutes();
  public routineExerciseRoutes: RoutineExerciseRoutes =
    new RoutineExerciseRoutes();
  public measurementRoutes: MeasurementRoutes = new MeasurementRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public rolesRoutes: RolesRoutes = new RolesRoutes();
  public resourcesRoutes: ResourcesRoutes = new ResourcesRoutes();
  public roleUsersRoutes: RoleUsersRoutes = new RoleUsersRoutes();
  public resourceRolesRoutes: ResourceRolesRoutes = new ResourceRolesRoutes();
  public refreshTokensRoutes: RefreshTokensRoutes = new RefreshTokensRoutes();
  public sessionRoutes: SessionRoutes = new SessionRoutes();
}
