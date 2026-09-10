export const createClientsTableMigration = {
  name: 'create-clients-table',

  async up(): Promise<void> {
    // En desarrollo, Sequelize crea la tabla automáticamente
    // mediante sequelize.sync().
  },

  async down(): Promise<void> {
    // En producción, aquí se implementaría la eliminación
    // de la tabla clients.
  },
};
