import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { forkJoin } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import {
  Payment,
  PaymentPayload,
  PaymentStatus,
} from '../../../core/models/payment.model';
import { Membership } from '../../../core/models/membership.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';

import { PaymentApi } from '../payment-api.service';
import { PaymentForm } from '../payment-form/payment-form';
import { MembershipApi } from '../../memberships/membership-api.service';

@Component({
  selector: 'app-payment-list',
  host: { class: 'block' },
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    TableModule,
    TagModule,
    TooltipModule,
    EmptyState,
    PageHeader,
    PaymentForm,
  ],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList {
  private readonly api = inject(PaymentApi);
  private readonly membershipApi = inject(MembershipApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Payment[]>([]);
  readonly memberships = signal<Membership[]>([]);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Payment | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar pago' : 'Nuevo pago',
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      payment => [
        this.membershipName(payment.referenciaId),
        payment.metodo,
        payment.estado,
        String(payment.monto),
        payment.fecha,
        String(payment.id),
      ],
    ),
  );

  readonly paidCount = computed(() =>
    this.rows().filter(payment => payment.estado === 'PAGADO').length,
  );

  readonly pendingCount = computed(() =>
    this.rows().filter(payment => payment.estado === 'PENDIENTE').length,
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      payments: this.api.list(),
      memberships: this.membershipApi.list(),
    }).subscribe({
      next: ({ payments, memberships }) => {
        this.rows.set(payments);
        this.memberships.set(memberships);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  membershipName(membershipId: number): string {
    return this.memberships().find(
      membership => membership.id === membershipId,
    )?.nombre ?? `Membresía #${membershipId}`;
  }

  formatAmount(amount: number | string): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(Number(amount));
  }

  statusLabel(status: PaymentStatus): string {
    const labels: Record<PaymentStatus, string> = {
      PENDIENTE: 'Pendiente',
      PAGADO: 'Pagado',
      ANULADO: 'Anulado',
    };

    return labels[status];
  }

  statusSeverity(
    status: PaymentStatus,
  ): 'success' | 'warn' | 'danger' {
    const severities: Record<
      PaymentStatus,
      'success' | 'warn' | 'danger'
    > = {
      PENDIENTE: 'warn',
      PAGADO: 'success',
      ANULADO: 'danger',
    };

    return severities[status];
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(payment: Payment): void {
    this.editing.set(payment);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: PaymentPayload): void {
    const current = this.editing();
    this.saving.set(true);

    const request = current
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);

        this.notify.success(
          current ? 'Pago actualizado' : 'Pago registrado',
        );

        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar el pago', toApiMessage(error));
      },
    });
  }

  remove(payment: Payment): void {
    this.confirmation.confirm({
      header: 'Eliminar pago',
      message: `¿Eliminar definitivamente el pago #${payment.id}? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(payment.id).subscribe({
          next: () => {
            this.notify.success('Pago eliminado');
            this.load();
          },
          error: (error: unknown) => {
            this.notify.error(
              'No se pudo eliminar el pago',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
  }
}
