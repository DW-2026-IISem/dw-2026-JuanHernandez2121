import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Resource, ResourcePayload } from '../../../core/models/resource.model';
import { ActivatableCrudApi } from '../../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class ResourceApi extends ActivatableCrudApi<Resource, ResourcePayload> {
  protected readonly endpoint = `${environment.apiUrl}/recursos`;

  constructor() {
    super('resources', 'resource');
  }
}
