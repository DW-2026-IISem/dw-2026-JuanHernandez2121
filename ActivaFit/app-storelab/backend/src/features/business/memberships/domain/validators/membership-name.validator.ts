export function isValidMembershipName(nombre: string): boolean {
  return !!nombre?.trim() && nombre.trim().length <= 150;
}
