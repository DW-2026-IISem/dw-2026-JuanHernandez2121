import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const exerciseSwagger = businessCrudSwagger({
  tag: "Ejercicios",
  description: "Catálogo de ejercicios — JWT + RBAC",
  path: "/api/ejercicios",
  schemaName: "Exercise",
  listKey: "exercises",
  itemKey: "exercise",
  deactivate: true,
  example: {
    nombre: "Press banca",
    descripcion: "Pecho",
    tipo: "fuerza",
    nivel: "INTERMEDIATE",
    status: "ACTIVE",
  },
});
