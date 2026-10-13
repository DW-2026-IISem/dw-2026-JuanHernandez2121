/**
 * Cantidad de registros por feature/entidad.
 * Prioridad: CLI (--clients=N, --users=N) > env (SEED_CLIENTS, SEED_USERS) > default.
 */
export type SeedCounts = {
  clients: number;
  users: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  clients: 10,
  users: 2,
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {
  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  const envClients = process.env.SEED_CLIENTS;
  const envUsers = process.env.SEED_USERS;

  if (envClients !== undefined && envClients !== "") {
    counts.clients = Number(envClients);
  }

  if (envUsers !== undefined && envUsers !== "") {
    counts.users = Number(envUsers);
  }

  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z_]+)=(\d+)$/);

    if (!m) continue;

    const key = m[1] as keyof SeedCounts;
    const value = Number(m[2]);

    if (key in counts) {
      counts[key] = value;
    }
  }

  return counts;
}
