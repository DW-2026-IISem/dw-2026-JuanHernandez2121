import { UpdateResourceDto } from "./update-resource.dto";

/**
 * Datos de entrada de PATCH /api/recursos/:id.
 */
export type PatchResourceDto = Partial<UpdateResourceDto>;
