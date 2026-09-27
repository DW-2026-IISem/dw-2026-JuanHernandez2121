export const createAttendancesTableMigration = {
  name: 'create-attendances-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE attendances (id, name, description, membershipId, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE attendances
  },
};
