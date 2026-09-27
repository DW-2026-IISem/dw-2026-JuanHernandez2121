export const createTrainersTableMigration = {
  name: 'create-trainers-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE trainers (id, nombre, descripcion, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE trainers
  },
};
