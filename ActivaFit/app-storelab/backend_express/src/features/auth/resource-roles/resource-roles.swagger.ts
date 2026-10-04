import {
  bearerSecurity,
  forbiddenResponse,
  invalidIdResponse,
  notFoundResponse,
  unauthorizedResponse,
} from "../../../shared/http/swagger-security";

export const resourceRolesSwagger = {
  tags: [
    {
      name: "Concesiones rol-recurso",
      description:
        "Conceder, retirar y reactivar recursos a un rol: gestión de permisos mediante JWT + RBAC.",
    },
  ],

  paths: {
    "/api/concesiones-rol": {
      get: {
        tags: ["Concesiones rol-recurso"],
        summary: "Listar concesiones activas",
        description:
          "JWT + RBAC. Permite filtrar por role_id o resource_id.",
        security: bearerSecurity,
        parameters: [
          {
            name: "role_id",
            in: "query",
            required: false,
            schema: { type: "integer" },
          },
          {
            name: "resource_id",
            in: "query",
            required: false,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description:
              "Lista de concesiones ({ grants: [...] })",
          },
          "401": unauthorizedResponse,
          "403": forbiddenResponse,
        },
      },

      post: {
        tags: ["Concesiones rol-recurso"],
        summary: "Conceder recurso a rol",
        description:
          "Crea o reactiva una concesión rol-recurso.",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResourceRoleCreate",
              },
            },
          },
        },
        responses: {
          "201": {
            description:
              "Permiso concedido ({ message, grant })",
          },
          "401": unauthorizedResponse,
          "403": forbiddenResponse,
          "404": {
            description:
              "Rol o recurso inexistente o inactivo",
          },
          "409": {
            description:
              "El rol ya tiene concedido ese recurso",
          },
        },
      },
    },

    "/api/concesiones-rol/{id}": {
      get: {
        tags: ["Concesiones rol-recurso"],
        summary: "Obtener concesión por id",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Concesión encontrada",
          },
          "400": invalidIdResponse,
          "401": unauthorizedResponse,
          "403": forbiddenResponse,
          "404": notFoundResponse,
        },
      },
    },

    "/api/concesiones-rol/{id}/deactivate": {
      patch: {
        tags: ["Concesiones rol-recurso"],
        summary: "Retirar permiso",
        description:
          "Borrado lógico de la concesión rol-recurso.",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Permiso retirado",
          },
          "400": invalidIdResponse,
          "401": unauthorizedResponse,
          "403": forbiddenResponse,
          "404": notFoundResponse,
        },
      },
    },

    "/api/concesiones-rol/{id}/reactivate": {
      patch: {
        tags: ["Concesiones rol-recurso"],
        summary: "Reactivar permiso",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Permiso reactivado",
          },
          "400": invalidIdResponse,
          "401": unauthorizedResponse,
          "403": forbiddenResponse,
          "404": notFoundResponse,
          "409": {
            description:
              "La concesión ya estaba activa",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      ResourceRole: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          role_id: {
            type: "integer",
            example: 2,
          },
          resource_id: {
            type: "integer",
            example: 25,
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            example: "active",
          },
          role: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: {
                type: "string",
                example: "SELLER",
              },
            },
          },
          resource: {
            type: "object",
            properties: {
              id: { type: "integer" },
              method: {
                type: "string",
                example: "POST",
              },
              path: {
                type: "string",
                example: "/api/ventas",
              },
              description: {
                type: "string",
                nullable: true,
              },
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      ResourceRoleCreate: {
        type: "object",
        required: ["role_id", "resource_id"],
        properties: {
          role_id: {
            type: "integer",
            example: 2,
          },
          resource_id: {
            type: "integer",
            example: 25,
          },
        },
      },
    },
  },
};
