export const createRoutinesTableMigration = {
  name: 'create-routines-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE routines (id, nombre, descripcion, entrenadorId, clienteId, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE routines
  },
};
