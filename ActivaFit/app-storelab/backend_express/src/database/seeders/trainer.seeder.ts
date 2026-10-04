import { Trainer } from "../../features/business/trainers/trainer.model";

export async function seedTrainers(): Promise<void> {
  const count = await Trainer.count();

  if (count > 0) {
    console.log("ℹ️ Los entrenadores ya tienen datos. Seeder omitido.");
    return;
  }

  await Trainer.bulkCreate([
    {
      nombre: "Carlos Rodríguez",
      descripcion: "Entrenador especializado en acondicionamiento físico.",
      status: "ACTIVE",
    },
    {
      nombre: "Laura Martínez",
      descripcion: "Entrenadora especializada en entrenamiento funcional.",
      status: "ACTIVE",
    },
    {
      nombre: "Andrés Gómez",
      descripcion: "Entrenador especializado en fuerza y resistencia.",
      status: "ACTIVE",
    },
  ]);

  console.log("✅ Seeder de entrenadores ejecutado correctamente.");
}
