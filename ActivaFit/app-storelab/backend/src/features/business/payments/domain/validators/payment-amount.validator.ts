export function isValidPaymentAmount(monto: number): boolean {
  return monto > 0 && Number.isFinite(monto);
}
