import { AttendanceModel } from '../models/attendance.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedAttendances(): Promise<void> {
  const count = await AttendanceModel.count();
  if (count > 0) {
    return;
  }

  await AttendanceModel.bulkCreate([
    {
      name: 'Asistencia de mañana',
      description: 'Registro de asistencia en horario de mañana',
      membershipId: 1,
      status: Status.ACTIVE,
    },
    {
      name: 'Asistencia de tarde',
      description: 'Registro de asistencia en horario de tarde',
      membershipId: 2,
      status: Status.ACTIVE,
    },
  ]);
}
