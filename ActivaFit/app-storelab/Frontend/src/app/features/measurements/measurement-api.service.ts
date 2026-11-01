import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Measurement, MeasurementPayload } from '../../core/models/measurement.model';
import { CrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class MeasurementApi extends CrudApi<Measurement, MeasurementPayload> {
  protected readonly endpoint = `${environment.apiUrl}/mediciones`;

  constructor() {
    super('measurements', 'measurement');
  }
}
