import { Trainer } from "../../features/business/trainers/trainer.model";

export async function countTrainers(): Promise<void> {
  const total = await Trainer.count();

  console.log(`📊 Total de entrenadores: ${total}`);
}
