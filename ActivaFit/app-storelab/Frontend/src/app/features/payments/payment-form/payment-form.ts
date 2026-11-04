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

import {
  Payment,
  PaymentPayload,
  PaymentStatus,
} from '../../../core/models/payment.model';
import { Membership } from '../../../core/models/membership.model';

import { MembershipApi } from '../../memberships/membership-api.service';

interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-payment-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm {
  readonly payment = input<Payment | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<PaymentPayload>();
  readonly cancelled = output<void>();

  readonly memberships = signal<SelectOption[]>([]);
  readonly loadingOptions = signal(true);
  readonly optionsError = signal('');

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly membershipApi = inject(MembershipApi);

  readonly methodOptions = [
    { label: 'Efectivo', value: 'Efectivo' },
    { label: 'Transferencia', value: 'Transferencia' },
    { label: 'Tarjeta', value: 'Tarjeta' },
  ];

  readonly statusOptions = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Pagado', value: 'PAGADO' },
    { label: 'Anulado', value: 'ANULADO' },
  ];

  readonly form = this.fb.group({
    referenciaId: [0, [Validators.required, Validators.min(1)]],
    metodo: ['', [Validators.required]],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    fecha: [this.today(), [Validators.required]],
    estado: ['PENDIENTE' as PaymentStatus, [Validators.required]],
  });

  constructor() {
    this.loadMemberships();

    effect(() => {
      const current = this.payment();
      this.resetKey();

      this.form.reset({
        referenciaId: current?.referenciaId ?? 0,
        metodo: current?.metodo ?? '',
        monto: current ? Number(current.monto) : 0,
        fecha: current?.fecha ?? this.today(),
        estado: current?.estado ?? 'PENDIENTE',
      });
    });
  }

  private today(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private loadMemberships(): void {
    this.loadingOptions.set(true);
    this.optionsError.set('');

    this.membershipApi.list().subscribe({
      next: (memberships: Membership[]) => {
        this.memberships.set(
          memberships.map(membership => ({
            label: `${membership.nombre} - Membresía #${membership.id}`,
            value: membership.id,
          })),
        );

        this.loadingOptions.set(false);
      },
      error: () => {
        this.optionsError.set('No fue posible cargar las membresías.');
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

    const payload: PaymentPayload = {
      referenciaTipo: 'MEMBRESIA',
      referenciaId: value.referenciaId,
      metodo: value.metodo,
      monto: value.monto,
      fecha: value.fecha,
      estado: value.estado,
    };

    this.saved.emit(payload);
  }
}
