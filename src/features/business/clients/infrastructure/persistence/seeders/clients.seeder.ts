import { ClientModel } from '../models/client.model';

export async function seedClients(): Promise<void> {
  const count = await ClientModel.count();

  if (count > 0) {
    return;
  }

  await ClientModel.bulkCreate([
    {
      tipoDocumento: 'CC',
      numeroDocumento: '1001001001',
      nombre: 'Juan Pérez',
      telefono: '+57 300 1234567',
      email: 'juan.perez@example.com',
      isActive: true,
    },
    {
      tipoDocumento: 'CC',
      numeroDocumento: '1001001002',
      nombre: 'María García',
      telefono: '+57 310 9876543',
      email: 'maria.garcia@example.com',
      isActive: true,
    },
  ]);
}
