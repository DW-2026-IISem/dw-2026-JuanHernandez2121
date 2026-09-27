export function isValidAttendanceName(nombre: string): boolean {
  return !!nombre?.trim() && nombre.trim().length <= 150;
}
