import { RoutineModel } from '../models/routine.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedRoutines(): Promise<void> {
  const count = await RoutineModel.count();
  if (count > 0) {
    return;
  }

  await RoutineModel.bulkCreate([
    {
      nombre: 'Rutina de acondicionamiento físico',
      descripcion: 'Rutina enfocada en mejorar la condición física general',
      entrenadorId: 1,
      clienteId: 1,
      status: Status.ACTIVE,
    },
    {
      nombre: 'Rutina de entrenamiento funcional',
      descripcion: 'Rutina enfocada en fuerza, movilidad y resistencia',
      entrenadorId: 2,
      clienteId: 2,
      status: Status.ACTIVE,
    },
  ]);
}
