/**
 * Catálogo RBAC de ActivaFit.
 *
 * Un recurso es un par (method, path).
 * ADMIN recibe todos.
 * SELLER recibe los marcados con seller: true.
 *
 * Las operaciones de sesión no son recursos RBAC.
 */

export interface CatalogResource {
  method: string;
  path: string;
  description: string;
  seller?: boolean;
}

function crud(
  base: string,
  label: string,
  options?: { sellerRead?: boolean; sellerWrite?: boolean; deactivate?: boolean }
): CatalogResource[] {
  const sellerRead = options?.sellerRead === true;
  const sellerWrite = options?.sellerWrite === true;
  const items: CatalogResource[] = [
    {
      method: "GET",
      path: base,
      description: `Listar ${label}`,
      seller: sellerRead || undefined,
    },
    {
      method: "GET",
      path: `${base}/:id`,
      description: `Consultar ${label}`,
      seller: sellerRead || undefined,
    },
    {
      method: "POST",
      path: base,
      description: `Crear ${label}`,
      seller: sellerWrite || undefined,
    },
    {
      method: "PUT",
      path: `${base}/:id`,
      description: `Reemplazar ${label}`,
    },
    {
      method: "PATCH",
      path: `${base}/:id`,
      description: `Modificar ${label}`,
    },
    {
      method: "DELETE",
      path: `${base}/:id`,
      description: `Eliminar ${label}`,
    },
  ];

  if (options?.deactivate !== false) {
    items.push({
      method: "PATCH",
      path: `${base}/:id/deactivate`,
      description: `Desactivar ${label}`,
    });
  }

  return items;
}

export const RESOURCE_CATALOG: readonly CatalogResource[] = [
  ...crud("/api/clientes", "clientes", { sellerRead: true }),
  ...crud("/api/planes", "planes", { sellerRead: true }),
  ...crud("/api/membresias", "membresías", {
    sellerRead: true,
    sellerWrite: true,
  }),
  ...crud("/api/asistencias", "asistencias", {
    sellerRead: true,
    sellerWrite: true,
  }),
  ...crud("/api/entrenadores", "entrenadores"),
  ...crud("/api/rutinas", "rutinas"),
  ...crud("/api/ejercicios", "ejercicios"),
  ...crud("/api/rutina-ejercicios", "rutina-ejercicios"),
  ...crud("/api/mediciones", "mediciones", { deactivate: false }),
  ...crud("/api/pagos", "pagos", {
    sellerRead: true,
    sellerWrite: true,
    deactivate: false,
  }),

  ...crud("/api/usuarios", "usuarios"),
  {
    method: "PATCH",
    path: "/api/usuarios/:id/password",
    description: "Cambiar contraseña de usuario",
  },
  {
    method: "GET",
    path: "/api/usuarios/:id/permisos",
    description: "Consultar permisos efectivos del usuario",
  },
  ...crud("/api/roles", "roles"),
  ...crud("/api/recursos", "recursos"),

  {
    method: "GET",
    path: "/api/asignaciones-rol",
    description: "Listar asignaciones usuario-rol",
  },
  {
    method: "GET",
    path: "/api/asignaciones-rol/:id",
    description: "Consultar asignación usuario-rol",
  },
  {
    method: "POST",
    path: "/api/asignaciones-rol",
    description: "Asignar rol a usuario",
  },
  {
    method: "PATCH",
    path: "/api/asignaciones-rol/:id/deactivate",
    description: "Retirar rol a usuario",
  },
  {
    method: "PATCH",
    path: "/api/asignaciones-rol/:id/reactivate",
    description: "Reactivar rol a usuario",
  },

  {
    method: "GET",
    path: "/api/concesiones-rol",
    description: "Listar concesiones rol-recurso",
  },
  {
    method: "GET",
    path: "/api/concesiones-rol/:id",
    description: "Consultar concesión rol-recurso",
  },
  {
    method: "POST",
    path: "/api/concesiones-rol",
    description: "Conceder recurso a rol",
  },
  {
    method: "PATCH",
    path: "/api/concesiones-rol/:id/deactivate",
    description: "Retirar recurso a rol",
  },
  {
    method: "PATCH",
    path: "/api/concesiones-rol/:id/reactivate",
    description: "Reactivar recurso a rol",
  },
];

export const SELLER_RESOURCES: readonly CatalogResource[] =
  RESOURCE_CATALOG.filter((resource) => resource.seller === true);
