import {
  invalidIdResponse,
  notFoundResponse,
  openSecurity,
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
  const paths: Record<string, unknown> = {
    [cfg.path]: {
      get: {
        tags: [cfg.tag],
        summary: `Listar ${cfg.tag.toLowerCase()}`,
        description: `SIN AUTH — GET ${cfg.path}`,
        security: openSecurity,
        responses: {
          "200": {
            description: `Lista ({ ${cfg.listKey}: [...] })`,
          },
        },
      },
      post: {
        tags: [cfg.tag],
        summary: `Crear`,
        description: `SIN AUTH — POST ${cfg.path}`,
        security: openSecurity,
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
        },
      },
    },
    [`${cfg.path}/{id}`]: {
      get: {
        tags: [cfg.tag],
        summary: "Consultar por id",
        description: `SIN AUTH — GET ${cfg.path}/:id`,
        security: openSecurity,
        parameters: idParam(),
        responses: {
          "200": { description: `{ ${cfg.itemKey} }` },
          "400": invalidIdResponse,
          "404": notFoundResponse,
        },
      },
      put: {
        tags: [cfg.tag],
        summary: "Reemplazar",
        description: `SIN AUTH — PUT ${cfg.path}/:id`,
        security: openSecurity,
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
          "404": notFoundResponse,
        },
      },
      patch: {
        tags: [cfg.tag],
        summary: "Modificar",
        description: `SIN AUTH — PATCH ${cfg.path}/:id`,
        security: openSecurity,
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
          "404": notFoundResponse,
        },
      },
      delete: {
        tags: [cfg.tag],
        summary: "Eliminar físicamente",
        description: `SIN AUTH — DELETE ${cfg.path}/:id`,
        security: openSecurity,
        parameters: idParam(),
        responses: {
          "200": { description: "Eliminado" },
          "400": invalidIdResponse,
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
        description: `SIN AUTH — PATCH ${cfg.path}/:id/deactivate`,
        security: openSecurity,
        parameters: idParam(),
        responses: {
          "200": { description: "Desactivado" },
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
