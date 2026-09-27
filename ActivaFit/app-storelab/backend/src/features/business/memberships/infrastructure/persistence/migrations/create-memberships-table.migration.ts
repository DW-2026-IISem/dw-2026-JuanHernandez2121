export const createMembershipsTableMigration = {
  name: 'create-memberships-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE membresias (id, nombre, descripcion, planId, clienteId, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE membresias
  },
};
