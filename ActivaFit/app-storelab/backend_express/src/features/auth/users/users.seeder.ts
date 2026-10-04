import { User } from "./user.model";
import { faker } from "@faker-js/faker";

/**
 * Seeder de usuarios.
 *
 * Crea dos usuarios canónicos para las pruebas de autenticación y RBAC:
 *
 * admin  -> Admin123!
 * seller -> Seller123!
 *
 * Si count > 2, se crean usuarios adicionales sin rol asignado.
 * Las contraseñas son hasheadas por el hook beforeCreate del modelo User.
 *
 * El seeder es idempotente mediante findOrCreate por username.
 */
export const SEED_USERS = [
  {
    username: "admin",
    email: "admin@storelab.local",
    password: "Admin123!",
  },
  {
    username: "seller",
    email: "seller@storelab.local",
    password: "Seller123!",
  },
] as const;

export async function seedUsers(
  count: number
): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  users: count=0, se omite");
    return 0;
  }

  let created = 0;

  for (const item of SEED_USERS) {
    const [user, wasCreated] =
      await User.findOrCreate({
        where: {
          username: item.username,
        },
        defaults: {
          username: item.username,
          email: item.email,
          password: item.password,
          avatar: null,
          status: "active",
        },
      });

    if (wasCreated) {
      created++;
      continue;
    }

    // Reactivar usuarios canónicos si quedaron inactivos.
    if (user.status !== "active") {
      await user.update({
        status: "active",
      });
    }
  }

  const extras = Math.max(
    0,
    count - SEED_USERS.length
  );

  for (let i = 0; i < extras; i++) {
    const username =
      `user.${i}.${faker.string.alphanumeric(6)}`
        .toLowerCase();

    await User.create({
      username,
      email: `${username}@example.com`,
      password: "Password123!",
      avatar: null,
      status: "active",
    });

    created++;
  }

  console.log(
    `✅ users: insertados ${created} usuario(s) ` +
      `(2 canónicos + ${extras} aleatorios)`
  );

  return created;
}
