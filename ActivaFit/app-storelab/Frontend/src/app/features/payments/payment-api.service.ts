import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Payment, PaymentPayload } from '../../core/models/payment.model';
import { CrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class PaymentApi extends CrudApi<Payment, PaymentPayload> {
  protected readonly endpoint = `${environment.apiUrl}/pagos`;

  constructor() {
    super('payments', 'payment');
  }
}
