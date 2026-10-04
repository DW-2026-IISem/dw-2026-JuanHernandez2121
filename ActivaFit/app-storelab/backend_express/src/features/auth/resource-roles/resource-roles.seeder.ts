import { Resource } from "../resources/resource.model";
import { Role } from "../roles/role.model";
import {
  RESOURCE_CATALOG,
  SELLER_RESOURCES,
} from "../resources/resource-catalog";
import { ResourceRolesService } from "./resource-roles.service";

/**
 * Seeder de las concesiones rol ↔ recurso (`resource_roles`).
 *
 * Construye la matriz de permisos:
 * - ADMIN  -> todos los recursos del catálogo.
 * - SELLER -> únicamente los recursos definidos para operación.
 *
 * Al utilizar `reconcileRole`, el seeder es determinista:
 * - concede lo que falta,
 * - reactiva lo inactivo,
 * - desactiva lo que ya no pertenece al conjunto esperado.
 */
export async function seedResourceRoles(): Promise<number> {
  const service = new ResourceRolesService();

  const resources = await Resource.findAll({
    where: { status: "active" },
  });

  const idByOperation = new Map(
    resources.map((resource) => [
      `${resource.method} ${resource.path}`,
      resource.id,
    ])
  );

  const idsFor = (
    catalog: ReadonlyArray<{
      method: string;
      path: string;
    }>
  ): number[] =>
    catalog
      .map((item) =>
        idByOperation.get(`${item.method} ${item.path}`)
      )
      .filter(
        (id): id is number =>
          typeof id === "number"
      );

  let total = 0;

  const admin = await Role.findOne({
    where: { name: "ADMIN" },
  });

  if (admin) {
    const result = await service.reconcileRole(
      admin.id,
      idsFor(RESOURCE_CATALOG)
    );

    console.log(
      `✅ resource_roles: ADMIN -> ${result.total_active} recursos ` +
        `(${result.activated} altas, ${result.deactivated} bajas)`
    );

    total += result.total_active;
  }

  const seller = await Role.findOne({
    where: { name: "SELLER" },
  });

  if (seller) {
    const result = await service.reconcileRole(
      seller.id,
      idsFor(SELLER_RESOURCES)
    );

    console.log(
      `✅ resource_roles: SELLER -> ${result.total_active} recursos ` +
        `(${result.activated} altas, ${result.deactivated} bajas)`
    );

    total += result.total_active;
  }

  return total;
}
