export function isValidRoutineDescription(descripcion: string): boolean {
  return descripcion.trim().length <= 1000;
}
