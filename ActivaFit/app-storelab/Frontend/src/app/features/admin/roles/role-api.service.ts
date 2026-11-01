import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Role, RolePayload } from '../../../core/models/role.model';
import { ActivatableCrudApi } from '../../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class RoleApi extends ActivatableCrudApi<Role, RolePayload> {
  protected readonly endpoint = `${environment.apiUrl}/roles`;

  constructor() {
    super('roles', 'role');
  }
}
