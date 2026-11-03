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

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { Status } from '../../../core/models/api.model';
import {
  Membership,
  MembershipPayload,
} from '../../../core/models/membership.model';
import { Client } from '../../../core/models/client.model';
import { Plan } from '../../../core/models/plan.model';

import { ClientApi } from '../../clients/client-api.service';
import { PlanApi } from '../../plans/plan-api.service';

interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-membership-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './membership-form.html',
  styleUrl: './membership-form.css',
})
export class MembershipForm {
  readonly membership = input<Membership | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<MembershipPayload>();
  readonly cancelled = output<void>();

  readonly plans = signal<SelectOption[]>([]);
  readonly clients = signal<SelectOption[]>([]);
  readonly loadingOptions = signal(true);
  readonly optionsError = signal('');

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly planApi = inject(PlanApi);
  private readonly clientApi = inject(ClientApi);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: [''],
    planId: [0, [Validators.required, Validators.min(1)]],
    clienteId: [0, [Validators.required, Validators.min(1)]],
    status: ['active' as Status, [Validators.required]],
  });

  constructor() {
    this.loadOptions();

    effect(() => {
      const current = this.membership();
      this.resetKey();

      this.form.reset({
        nombre: current?.nombre ?? '',
        descripcion: current?.descripcion ?? '',
        planId: current?.planId ?? 0,
        clienteId: current?.clienteId ?? 0,
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

    this.planApi.list().subscribe({
      next: (plans: Plan[]) => {
        this.plans.set(
          plans
            .filter(plan => plan.isActive)
            .map(plan => ({
              label: plan.nombre,
              value: plan.id,
            }))
        );

        this.clientApi.list().subscribe({
          next: (clients: Client[]) => {
            this.clients.set(
              clients
                .filter(client => client.status.toLowerCase() === 'active')
                .map(client => ({
                  label: client.name,
                  value: client.id,
                }))
            );

            this.loadingOptions.set(false);
          },
          error: () => {
            this.optionsError.set('No fue posible cargar los clientes.');
            this.loadingOptions.set(false);
          },
        });
      },
      error: () => {
        this.optionsError.set('No fue posible cargar los planes.');
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

    const payload: MembershipPayload = {
      nombre: value.nombre.trim(),
      descripcion: value.descripcion.trim() || null,
      planId: value.planId,
      clienteId: value.clienteId,
      ...(this.membership() ? {} : { status: value.status }),
    };

    this.saved.emit(payload);
  }
}
