import { faker } from "@faker-js/faker";
import { Plan } from "./plan.model";

/**
 * Seeder del feature Plan (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner),
 * no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedPlans(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  plans: count=0, se omite");
    return 0;
  }

  const existing = await Plan.count();

  if (existing > 0) {
    console.log(
      `⏭️  plans: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const rows = Array.from({ length: count }, () => ({
    nombre: `Plan ${faker.commerce.productAdjective()}`,
    descripcion: faker.commerce.productDescription(),
    precio: faker.number.int({
      min: 30000,
      max: 200000,
    }),
    duracion: faker.helpers.arrayElement([15, 30, 60, 90]),
    is_active: true,
  }));

  await Plan.bulkCreate(rows);

  console.log(`✅ plans: insertados ${count} registro(s) falsos`);

  return count;
}
