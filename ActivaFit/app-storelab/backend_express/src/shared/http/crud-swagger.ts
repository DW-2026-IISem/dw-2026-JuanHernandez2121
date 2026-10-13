import {
  bearerSecurity,
  forbiddenResponse,
  invalidIdResponse,
  notFoundResponse,
  unauthorizedResponse,
} from "./swagger-security";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
  };
};

type CrudSwaggerConfig = {
  tag: string;
  description: string;
  path: string;
  schemaName: string;
  listKey: string;
  itemKey: string;
  example: Record<string, unknown>;
  deactivate?: boolean;
};

function idParam() {
  return [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
    },
  ];
}

export function businessCrudSwagger(
  cfg: CrudSwaggerConfig
): FeatureSwaggerModule {
  const auth = {
    security: bearerSecurity,
    "401": unauthorizedResponse,
    "403": forbiddenResponse,
  };

  const paths: Record<string, unknown> = {
    [cfg.path]: {
      get: {
        tags: [cfg.tag],
        summary: `Listar ${cfg.tag.toLowerCase()}`,
        description: `JWT + RBAC — GET ${cfg.path}`,
        security: auth.security,
        responses: {
          "200": {
            description: `Lista ({ ${cfg.listKey}: [...] })`,
          },
          "401": auth["401"],
          "403": auth["403"],
        },
      },
      post: {
        tags: [cfg.tag],
        summary: `Crear`,
        description: `JWT + RBAC — POST ${cfg.path}`,
        security: auth.security,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/${cfg.schemaName}` },
            },
          },
        },
        responses: {
          "201": { description: "Creado" },
          "400": { description: "Datos inválidos o FK inactiva" },
          "401": auth["401"],
          "403": auth["403"],
        },
      },
    },
    [`${cfg.path}/{id}`]: {
      get: {
        tags: [cfg.tag],
        summary: "Consultar por id",
        description: `JWT + RBAC — GET ${cfg.path}/:id`,
        security: auth.security,
        parameters: idParam(),
        responses: {
          "200": { description: `{ ${cfg.itemKey} }` },
          "400": invalidIdResponse,
          "401": auth["401"],
          "403": auth["403"],
          "404": notFoundResponse,
        },
      },
      put: {
        tags: [cfg.tag],
        summary: "Reemplazar",
        description: `JWT + RBAC — PUT ${cfg.path}/:id`,
        security: auth.security,
        parameters: idParam(),
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/${cfg.schemaName}` },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "400": invalidIdResponse,
          "401": auth["401"],
          "403": auth["403"],
          "404": notFoundResponse,
        },
      },
      patch: {
        tags: [cfg.tag],
        summary: "Modificar",
        description: `JWT + RBAC — PATCH ${cfg.path}/:id`,
        security: auth.security,
        parameters: idParam(),
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/${cfg.schemaName}` },
            },
          },
        },
        responses: {
          "200": { description: "Actualizado" },
          "400": invalidIdResponse,
          "401": auth["401"],
          "403": auth["403"],
          "404": notFoundResponse,
        },
      },
      delete: {
        tags: [cfg.tag],
        summary: "Eliminar físicamente",
        description: `JWT + RBAC — DELETE ${cfg.path}/:id`,
        security: auth.security,
        parameters: idParam(),
        responses: {
          "200": { description: "Eliminado" },
          "400": invalidIdResponse,
          "401": auth["401"],
          "403": auth["403"],
          "404": notFoundResponse,
        },
      },
    },
  };

  if (cfg.deactivate) {
    paths[`${cfg.path}/{id}/deactivate`] = {
      patch: {
        tags: [cfg.tag],
        summary: "Desactivar (borrado lógico)",
        description: `JWT + RBAC — PATCH ${cfg.path}/:id/deactivate`,
        security: auth.security,
        parameters: idParam(),
        responses: {
          "200": { description: "Desactivado" },
          "401": auth["401"],
          "403": auth["403"],
          "404": notFoundResponse,
        },
      },
    };
  }

  return {
    tags: [{ name: cfg.tag, description: cfg.description }],
    paths,
    components: {
      schemas: {
        [cfg.schemaName]: {
          type: "object",
          properties: Object.fromEntries(
            Object.entries(cfg.example).map(([key, value]) => [
              key,
              {
                type:
                  typeof value === "number"
                    ? "number"
                    : typeof value === "boolean"
                      ? "boolean"
                      : "string",
                example: value,
              },
            ])
          ),
        },
      },
    },
  };
}
