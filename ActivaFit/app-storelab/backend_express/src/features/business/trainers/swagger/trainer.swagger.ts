export const trainerSwagger = {
  tags: [
    {
      name: "Entrenadores",
      description: "Gestión de entrenadores de ActivaFit",
    },
  ],

  paths: {
    "/api/entrenadores": {
      get: {
        tags: ["Entrenadores"],
        summary: "Obtener todos los entrenadores activos",
        responses: {
          200: {
            description: "Lista de entrenadores",
          },
        },
      },

      post: {
        tags: ["Entrenadores"],
        summary: "Crear un entrenador",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nombre"],
                properties: {
                  nombre: {
                    type: "string",
                    example: "Carlos Rodríguez",
                  },
                  descripcion: {
                    type: "string",
                    example:
                      "Entrenador especializado en acondicionamiento físico",
                  },
                  status: {
                    type: "string",
                    enum: ["ACTIVE", "INACTIVE"],
                    example: "ACTIVE",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Entrenador creado correctamente",
          },
        },
      },
    },

    "/api/entrenadores/{id}": {
      get: {
        tags: ["Entrenadores"],
        summary: "Obtener un entrenador por ID",
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
          200: {
            description: "Entrenador encontrado",
          },
          404: {
            description: "Entrenador no encontrado",
          },
        },
      },

      put: {
        tags: ["Entrenadores"],
        summary: "Actualizar un entrenador completamente",
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
                $ref: "#/components/schemas/Trainer",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrenador actualizado correctamente",
          },
        },
      },

      patch: {
        tags: ["Entrenadores"],
        summary: "Actualizar parcialmente un entrenador",
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
                type: "object",
                properties: {
                  nombre: {
                    type: "string",
                  },
                  descripcion: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                    enum: ["ACTIVE", "INACTIVE"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrenador actualizado correctamente",
          },
        },
      },

      delete: {
        tags: ["Entrenadores"],
        summary: "Eliminar físicamente un entrenador",
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
          200: {
            description: "Entrenador eliminado correctamente",
          },
        },
      },
    },

    "/api/entrenadores/{id}/deactivate": {
      patch: {
        tags: ["Entrenadores"],
        summary: "Desactivar un entrenador",
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
          200: {
            description: "Entrenador desactivado correctamente",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Trainer: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          nombre: {
            type: "string",
            example: "Carlos Rodríguez",
          },
          descripcion: {
            type: "string",
            example:
              "Entrenador especializado en acondicionamiento físico",
          },
          status: {
            type: "string",
            enum: ["ACTIVE", "INACTIVE"],
            example: "ACTIVE",
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
    },
  },
};
