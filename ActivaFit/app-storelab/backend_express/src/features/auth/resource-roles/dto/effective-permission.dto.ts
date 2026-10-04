export interface EffectivePermissionDto {
  id: number;
  method: string;
  path: string;
  description?: string | null;
}
