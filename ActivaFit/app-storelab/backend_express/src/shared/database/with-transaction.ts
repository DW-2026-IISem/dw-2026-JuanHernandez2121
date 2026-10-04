import { Transaction } from "sequelize";
import { sequelize } from "../../database/db";

export async function withTransaction<T>(
  callback: (transaction: Transaction) => Promise<T>
): Promise<T> {
  return sequelize.transaction(async (transaction) => {
    return callback(transaction);
  });
}
