import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const membershipSwagger = businessCrudSwagger({
  tag: "Membresías",
  description: "Membresía de un cliente sobre un plan — JWT + RBAC",
  path: "/api/membresias",
  schemaName: "Membership",
  listKey: "memberships",
  itemKey: "membership",
  deactivate: true,
  example: {
    nombre: "Plan mensual Juan",
    descripcion: "Vigencia octubre",
    planId: 1,
    clienteId: 1,
    status: "active",
  },
});
