import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const paymentSwagger = businessCrudSwagger({
  tag: "Pagos",
  description:
    "Cobros conciliados con una membresía (referencia_tipo + referencia_id) — JWT + RBAC",
  path: "/api/pagos",
  schemaName: "Payment",
  listKey: "payments",
  itemKey: "payment",
  example: {
    referenciaTipo: "MEMBRESIA",
    referenciaId: 1,
    metodo: "tarjeta",
    monto: 120000,
    fecha: "2026-10-13",
    estado: "PAGADO",
  },
});
