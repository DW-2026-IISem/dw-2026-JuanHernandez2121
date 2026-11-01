import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User, UserPayload } from '../../../core/models/user.model';
import { ActivatableCrudApi } from '../../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class UserApi extends ActivatableCrudApi<User, UserPayload> {
  protected readonly endpoint = `${environment.apiUrl}/usuarios`;

  constructor() {
    super('users', 'user');
  }

  changePassword(id: number, payload: { password: string }): import('rxjs').Observable<unknown> {
    return this.http.patch(`${this.endpoint}/${id}/password`, payload);
  }

  permissions(id: number): import('rxjs').Observable<unknown> {
    return this.http.get(`${this.endpoint}/${id}/permisos`);
  }
}
