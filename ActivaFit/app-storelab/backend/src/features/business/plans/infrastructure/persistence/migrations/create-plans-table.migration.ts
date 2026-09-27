export const createPlansTableMigration = {
  name: 'create-plans-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE planes (id, nombre, descripcion, isActive, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE planes
  },
};
