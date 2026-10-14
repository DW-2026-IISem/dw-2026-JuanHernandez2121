import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const routineSwagger = businessCrudSwagger({
  tag: "Rutinas",
  description: "Rutinas asignadas por un entrenador a un cliente — SIN AUTH",
  path: "/api/rutinas",
  schemaName: "Routine",
  listKey: "routines",
  itemKey: "routine",
  deactivate: true,
  example: {
    nombre: "Fuerza tren superior",
    descripcion: "3 días por semana",
    entrenadorId: 1,
    clienteId: 1,
    status: "ACTIVE",
  },
});
