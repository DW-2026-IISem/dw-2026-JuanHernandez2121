import { Routine } from '../models/routine.model';

export const seedRoutines = async () => {
  const count = await Routine.count();
  if (count === 0) {
    await Routine.bulkCreate([
      { name: 'Rutina Hipertrofia Pecho/Tríceps', description: 'Enfoque en fuerza y masa muscular', durationWeeks: 4 },
      { name: 'Rutina Cardio / Definición', description: 'Circuito de alta intensidad', durationWeeks: 6 }
    ]);
    console.log('🌱 Seeders de Rutinas ejecutados correctamente');
  }
};
