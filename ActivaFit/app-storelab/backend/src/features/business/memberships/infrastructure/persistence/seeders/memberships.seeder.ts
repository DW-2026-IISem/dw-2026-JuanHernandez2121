import { MembershipModel } from '../models/membership.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedMemberships(): Promise<void> {
  const count = await MembershipModel.count();

  if (count > 0) {
    return;
  }

  await MembershipModel.bulkCreate([
    {
      nombre: 'Membresía Básica',
      descripcion: 'Membresía asociada al plan básico.',
      planId: 1,
      clienteId: 1,
      status: Status.ACTIVE,
    },
    {
      nombre: 'Membresía Premium',
      descripcion: 'Membresía asociada al plan premium.',
      planId: 2,
      clienteId: 2,
      status: Status.ACTIVE,
    },
  ]);
}
