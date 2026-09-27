import { PlanModel } from '../models/plan.model';

export async function seedPlans(): Promise<void> {
  const count = await PlanModel.count();

  if (count > 0) {
    return;
  }

  await PlanModel.bulkCreate([
    {
      nombre: 'Plan Básico',
      descripcion: 'Acceso básico al gimnasio.',
      isActive: true,
    },
    {
      nombre: 'Plan Premium',
      descripcion: 'Acceso completo y beneficios adicionales.',
      isActive: true,
    },
  ]);
}
