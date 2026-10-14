import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const attendanceSwagger = businessCrudSwagger({
  tag: "Asistencias",
  description:
    "Registro de entrada vinculado a una membresía vigente — SIN AUTH",
  path: "/api/asistencias",
  schemaName: "Attendance",
  listKey: "attendances",
  itemKey: "attendance",
  deactivate: true,
  example: {
    membresiaId: 1,
    fecha: "2026-10-13T08:00:00.000Z",
    observaciones: "Entrada turno mañana",
    status: "active",
  },
});
