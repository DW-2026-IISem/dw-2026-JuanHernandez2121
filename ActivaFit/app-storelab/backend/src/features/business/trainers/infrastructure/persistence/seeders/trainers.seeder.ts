import { TrainerModel } from '../models/trainer.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedTrainers(): Promise<void> {
  const count = await TrainerModel.count();
  if (count > 0) {
    return;
  }

  await TrainerModel.bulkCreate([
    {
      nombre: 'Carlos Rodríguez',
      descripcion: 'Entrenador especializado en acondicionamiento físico',
      status: Status.ACTIVE,
    },
    {
      nombre: 'Laura Martínez',
      descripcion: 'Entrenadora especializada en entrenamiento funcional',
      status: Status.ACTIVE,
    },
  ]);
}
