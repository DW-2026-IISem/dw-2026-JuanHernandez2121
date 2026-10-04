import { Resource, ResourceI } from "../resource.model";

/**
 * Respuesta HTTP de un recurso.
 */
export type ResourceResponseDto = ResourceI;

/**
 * Mapper modelo -> DTO de respuesta.
 */
export function toResourceResponse(
  resource: Resource
): ResourceResponseDto {
  return resource.toJSON() as ResourceI;
}
