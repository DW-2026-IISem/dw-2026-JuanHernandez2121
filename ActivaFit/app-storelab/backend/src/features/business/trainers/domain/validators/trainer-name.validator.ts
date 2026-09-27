export function isValidTrainerName(nombre: string): boolean {
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,150}$/;
  return nameRegex.test(nombre.trim());
}
