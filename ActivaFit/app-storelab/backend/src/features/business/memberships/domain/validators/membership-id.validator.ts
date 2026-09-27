export function isValidMembershipId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}
