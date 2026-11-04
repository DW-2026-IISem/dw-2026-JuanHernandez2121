import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { Status } from '../../../core/models/api.model';
import {
  Attendance,
  AttendancePayload,
} from '../../../core/models/attendance.model';
import { Membership } from '../../../core/models/membership.model';
import { Client } from '../../../core/models/client.model';

import { MembershipApi } from '../../memberships/membership-api.service';
import { ClientApi } from '../../clients/client-api.service';

interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-attendance-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './attendance-form.html',
  styleUrl: './attendance-form.css',
})
export class AttendanceForm {
  readonly attendance = input<Attendance | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<AttendancePayload>();
  readonly cancelled = output<void>();

  readonly memberships = signal<SelectOption[]>([]);
  readonly loadingOptions = signal(true);
  readonly optionsError = signal('');

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly membershipApi = inject(MembershipApi);
  private readonly clientApi = inject(ClientApi);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  readonly form = this.fb.group({
    membresiaId: [0, [Validators.required, Validators.min(1)]],
    fecha: ['', [Validators.required]],
    observaciones: [''],
    status: ['active' as Status, [Validators.required]],
  });

  constructor() {
    this.loadOptions();

    effect(() => {
      const current = this.attendance();
      this.resetKey();

      this.form.reset({
        membresiaId: current?.membresiaId ?? 0,
        fecha: current?.fecha
          ? current.fecha.split('T')[0]
          : new Date().toISOString().split('T')[0],
        observaciones: current?.observaciones ?? '',
        status: current?.status ?? 'active',
      });

      if (current) {
        this.form.controls.status.disable();
      } else {
        this.form.controls.status.enable();
      }
    });
  }

  private loadOptions(): void {
    this.loadingOptions.set(true);
    this.optionsError.set('');

    forkJoin({
      memberships: this.membershipApi.list(),
      clients: this.clientApi.list(),
    }).subscribe({
      next: ({ memberships, clients }) => {
        this.memberships.set(
          memberships
            .filter(membership =>
              membership.status.toLowerCase() === 'active',
            )
            .map(membership => {
              const client = clients.find(
                item => item.id === membership.clienteId,
              );

              return {
                label: `${membership.nombre} - ${client?.name ?? 'Cliente no disponible'}`,
                value: membership.id,
              };
            }),
        );

        this.loadingOptions.set(false);
      },
      error: () => {
        this.optionsError.set(
          'No fue posible cargar las membresías y los clientes.',
        );
        this.loadingOptions.set(false);
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: AttendancePayload = {
      membresiaId: value.membresiaId,
      fecha: value.fecha,
      observaciones: value.observaciones.trim() || null,
      ...(this.attendance() ? {} : { status: value.status }),
    };

    this.saved.emit(payload);
  }
}
