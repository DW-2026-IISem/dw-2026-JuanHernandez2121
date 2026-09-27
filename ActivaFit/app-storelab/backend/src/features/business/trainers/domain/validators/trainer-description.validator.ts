export function isValidTrainerDescription(descripcion: string): boolean {
  return descripcion.trim().length <= 1000;
}
