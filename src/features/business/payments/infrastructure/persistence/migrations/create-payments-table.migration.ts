export const createPaymentsTableMigration = {
  name: 'create-payments-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE payments (
    // id, monto, fechaPago, metodoPago, membresiaId, status, createdAt, updatedAt
    // )
  },
  async down(): Promise<void> {
    // Production: DROP TABLE payments
  },
};
