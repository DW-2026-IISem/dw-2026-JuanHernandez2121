import { User } from './user.model';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RefreshPayload {
  refresh_token: string;
}

export interface SessionTokens {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface EffectivePermission {
  resource_id: number;
  method: string;
  path: string;
  description: string | null;
  role_id: number;
  role_name: string;
}

export interface AuthSession {
  user: User;
  tokens: SessionTokens;
  permissions?: EffectivePermission[];
}
