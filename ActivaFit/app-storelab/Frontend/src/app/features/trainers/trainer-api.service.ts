import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Trainer, TrainerPayload } from '../../core/models/trainer.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class TrainerApi extends ActivatableCrudApi<Trainer, TrainerPayload> {
  protected readonly endpoint = `${environment.apiUrl}/entrenadores`;

  constructor() {
    super('trainers', 'trainer');
  }
}
