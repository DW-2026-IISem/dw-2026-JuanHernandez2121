/**
 * Documentación OpenAPI del feature Plan.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */

export const planSwagger = {
  tags: [
    {
      name: "Planes",
      description: "CRUD de planes — **SIN AUTH** (sin middleware JWT)",
    },
  ],
  paths: {
    "/api/planes": {
      get: {
        tags: ["Planes"],
        summary: "Listar planes activos",
        description: "SIN AUTH — retorna únicamente planes con is_active=true",
        security: [],
        responses: {
          "200": {
            description: "Lista de planes",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    plans: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Plan",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      post: {
        tags: ["Planes"],
        summary: "Crear plan",
        description: "SIN AUTH",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlanCreate",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Plan creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    plan: {
                      $ref: "#/components/schemas/Plan",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/planes/{id}": {
      get: {
        tags: ["Planes"],
        summary: "Obtener plan por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Plan encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    plan: {
                      $ref: "#/components/schemas/Plan",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      put: {
        tags: ["Planes"],
        summary: "Actualizar plan (PUT — reemplazo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlanUpdate",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Plan actualizado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      patch: {
        tags: ["Planes"],
        summary: "Actualizar plan (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlanPatch",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Plan actualizado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      delete: {
        tags: ["Planes"],
        summary: "Eliminar plan (físico)",
        description: "SIN AUTH — elimina físicamente la fila",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Plan eliminado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },
    },

    "/api/planes/{id}/deactivate": {
      patch: {
        tags: ["Planes"],
        summary: "Eliminar plan (lógico)",
        description: "SIN AUTH — is_active = false",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Plan desactivado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Plan: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          nombre: {
            type: "string",
            example: "Plan Premium",
          },
          descripcion: {
            type: "string",
            example: "Acceso completo al gimnasio y todas sus áreas",
            nullable: true,
          },
          precio: {
            type: "number",
            format: "decimal",
            example: 80000,
          },
          duracion: {
            type: "integer",
            example: 30,
          },
          is_active: {
            type: "boolean",
            example: true,
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

      PlanCreate: {
        type: "object",
        required: [
          "nombre",
          "precio",
          "duracion",
        ],
        properties: {
          nombre: {
            type: "string",
            example: "Plan Básico",
          },
          descripcion: {
            type: "string",
            example: "Acceso básico al gimnasio",
          },
          precio: {
            type: "number",
            format: "decimal",
            example: 50000,
          },
          duracion: {
            type: "integer",
            example: 30,
          },
          is_active: {
            type: "boolean",
            default: true,
            example: true,
          },
        },
      },

      PlanUpdate: {
        type: "object",
        required: [
          "nombre",
          "precio",
          "duracion",
        ],
        properties: {
          nombre: {
            type: "string",
          },
          descripcion: {
            type: "string",
          },
          precio: {
            type: "number",
            format: "decimal",
          },
          duracion: {
            type: "integer",
          },
          is_active: {
            type: "boolean",
          },
        },
      },

      PlanPatch: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
          },
          descripcion: {
            type: "string",
          },
          precio: {
            type: "number",
            format: "decimal",
          },
          duracion: {
            type: "integer",
          },
          is_active: {
            type: "boolean",
          },
        },
      },
    },
  },
};
