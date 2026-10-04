import { hash, compare } from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";

/**
 * Utilidades de seguridad de ActivaFit.
 *
 * Responsabilidades:
 * - Hash y verificación de contraseñas mediante bcrypt.
 * - Hash SHA-256 para refresh tokens.
 * - Generación de tokens opacos para renovación de sesión.
 *
 * Estas funciones pertenecen a la capa shared porque serán utilizadas
 * por diferentes features de autenticación.
 */

/**
 * Número de rondas utilizadas por bcrypt.
 * Se mantiene en 12 según la guía de la Fase II.
 */
const SALT_ROUNDS = 12;

/**
 * Genera el hash bcrypt de una contraseña.
 */
export async function hashPassword(plain: string): Promise<string> {
  return hash(plain, SALT_ROUNDS);
}

/**
 * Comprueba si una contraseña corresponde al hash almacenado.
 */
export async function comparePassword(
  plain: string,
  passwordHash: string
): Promise<boolean> {
  return compare(plain, passwordHash);
}

/**
 * Genera un hash SHA-256 en formato hexadecimal.
 *
 * Se utilizará para almacenar refresh tokens de forma segura,
 * evitando guardar el token original directamente en la BD.
 */
export function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * Genera un token opaco, aleatorio y seguro para refresh tokens.
 */
export function generateOpaqueToken(): string {
  return randomBytes(64).toString("base64url");
}
