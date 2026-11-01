import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Client, ClientPayload } from '../../core/models/client.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class ClientApi extends ActivatableCrudApi<Client, ClientPayload> {
  protected readonly endpoint = `${environment.apiUrl}/clientes`;

  constructor() {
    super('clients', 'client');
  }
}
