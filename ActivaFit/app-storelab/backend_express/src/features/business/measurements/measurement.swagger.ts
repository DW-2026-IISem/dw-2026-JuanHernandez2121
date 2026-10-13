import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const measurementSwagger = businessCrudSwagger({
  tag: "Mediciones",
  description:
    "Seguimiento físico del cliente, registrado por un entrenador — JWT + RBAC",
  path: "/api/mediciones",
  schemaName: "Measurement",
  listKey: "measurements",
  itemKey: "measurement",
  example: {
    clienteId: 1,
    entrenadorId: 1,
    peso: 72.5,
    altura: 1.75,
    imc: 23.67,
    fecha: "2026-10-13",
  },
});
