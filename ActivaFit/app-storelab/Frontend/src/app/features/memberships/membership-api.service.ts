import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Membership, MembershipPayload } from '../../core/models/membership.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class MembershipApi extends ActivatableCrudApi<Membership, MembershipPayload> {
  protected readonly endpoint = `${environment.apiUrl}/membresias`;

  constructor() {
    super('memberships', 'membership');
  }
}
