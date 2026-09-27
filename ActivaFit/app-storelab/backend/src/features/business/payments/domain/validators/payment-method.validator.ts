export function isValidPaymentMethod(metodoPago: string): boolean {
  const validMethods = ['efectivo', 'transferencia', 'tarjeta'];
  return validMethods.includes(metodoPago.toLowerCase().trim());
}
