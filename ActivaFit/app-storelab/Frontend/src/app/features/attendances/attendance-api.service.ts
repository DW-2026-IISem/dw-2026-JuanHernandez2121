import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Attendance, AttendancePayload } from '../../core/models/attendance.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class AttendanceApi extends ActivatableCrudApi<Attendance, AttendancePayload> {
  protected readonly endpoint = `${environment.apiUrl}/asistencias`;

  constructor() {
    super('attendances', 'attendance');
  }
}
