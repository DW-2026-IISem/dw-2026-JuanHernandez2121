import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { bearerSecurityScheme } from "../shared/http/swagger-security";
import { clientSwagger } from "../features/business/client/client.swagger";
import { planSwagger } from "../features/business/plans/plan.swagger";
import { membershipSwagger } from "../features/business/membership/membership.swagger";
import { attendanceSwagger } from "../features/business/attendances/attendance.swagger";
import { trainerSwagger } from "../features/business/trainers/swagger/trainer.swagger";
import { routineSwagger } from "../features/business/routines/routine.swagger";
import { exerciseSwagger } from "../features/business/exercises/exercise.swagger";
import { routineExerciseSwagger } from "../features/business/routine-exercises/routine-exercise.swagger";
import { measurementSwagger } from "../features/business/measurements/measurement.swagger";
import { paymentSwagger } from "../features/business/payments/payment.swagger";
import { usersSwagger } from "../features/auth/users/users.swagger";
import { rolesSwagger } from "../features/auth/roles/roles.swagger";
import { resourcesSwagger } from "../features/auth/resources/resources.swagger";
import { roleUsersSwagger } from "../features/auth/role-users/role-users.swagger";
import { resourceRolesSwagger } from "../features/auth/resource-roles/resource-roles.swagger";
import { refreshTokensSwagger } from "../features/auth/refresh-tokens/refresh-tokens.swagger";
import { sessionSwagger } from "../features/auth/session/session.swagger";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
  };
};

const featureSwaggerModules: FeatureSwaggerModule[] = [
  sessionSwagger,
  clientSwagger,
  planSwagger,
  membershipSwagger,
  attendanceSwagger,
  trainerSwagger,
  routineSwagger,
  exerciseSwagger,
  routineExerciseSwagger,
  measurementSwagger,
  paymentSwagger,
  usersSwagger,
  rolesSwagger,
  resourcesSwagger,
  roleUsersSwagger,
  resourceRolesSwagger,
  refreshTokensSwagger,
];

export function buildOpenApiDocument() {
  const tags: unknown[] = [];
  const paths: Record<string, unknown> = {};
  const schemas: Record<string, unknown> = {};

  for (const mod of featureSwaggerModules) {
    tags.push(...mod.tags);
    Object.assign(paths, mod.paths);

    if (mod.components?.schemas) {
      Object.assign(schemas, mod.components.schemas);
    }
  }

  return {
    openapi: "3.0.3",

    info: {
      title: "ActivaFit API",
      version: "1.0.0",
      description:
        "API de ActivaFit (Express + Sequelize): membresías, asistencia, rutinas, mediciones y cobros. Las rutas de negocio y administración usan JWT + RBAC. Login, refresh y logout son abiertos.",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Local",
      },
    ],

    tags,
    paths,

    components: {
      securitySchemes: bearerSecurityScheme,
      schemas,
    },
  };
}

export function setupSwagger(app: Application): void {
  const document = buildOpenApiDocument();

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(document));

  app.get("/api/docs.json", (_req, res) => {
    res.json(document);
  });

  console.log("📘 Swagger UI: /api/docs | OpenAPI JSON: /api/docs.json");
}
