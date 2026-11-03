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
  Membership,
  MembershipPayload,
} from '../../../core/models/membership.model';
import { Client } from '../../../core/models/client.model';
import { Plan } from '../../../core/models/plan.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { MembershipApi } from '../membership-api.service';
import { MembershipForm } from '../membership-form/membership-form';

import { ClientApi } from '../../clients/client-api.service';
import { PlanApi } from '../../plans/plan-api.service';

@Component({
  selector: 'app-membership-list',
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
    StatusTag,
    MembershipForm,
  ],
  templateUrl: './membership-list.html',
  styleUrl: './membership-list.css',
})
export class MembershipList {
  private readonly api = inject(MembershipApi);
  private readonly clientApi = inject(ClientApi);
  private readonly planApi = inject(PlanApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Membership[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly plans = signal<Plan[]>([]);

  readonly activeMembershipCount = computed(
    () => this.rows().filter(
      (membership) => membership.status.toLowerCase() === 'active',
    ).length,
  );


  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Membership | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar membresía' : 'Nueva membresía',
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      (membership) => [
        membership.nombre,
        membership.descripcion,
        this.clientName(membership.clienteId),
        this.planName(membership.planId),
      ],
    ),
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      memberships: this.api.list(),
      clients: this.clientApi.list(),
      plans: this.planApi.list(),
    }).subscribe({
      next: ({ memberships, clients, plans }) => {
        this.rows.set(memberships);
        this.clients.set(clients);
        this.plans.set(plans);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  clientName(clientId: number): string {
    return this.clients().find(client => client.id === clientId)?.name
      ?? `Cliente #${clientId}`;
  }

  planName(planId: number): string {
    return this.plans().find(plan => plan.id === planId)?.nombre
      ?? `Plan #${planId}`;
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(membership: Membership): void {
    this.editing.set(membership);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: MembershipPayload): void {
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
          current ? 'Membresía actualizada' : 'Membresía creada',
        );

        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(membership: Membership): void {
    this.confirmation.confirm({
      header: 'Desactivar membresía',
      message: `¿Desactivar la membresía ${membership.nombre}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.api.deactivate(membership.id).subscribe({
          next: () => {
            this.notify.warn('Membresía desactivada');
            this.load();
          },
          error: (error: unknown) => {
            this.notify.error(
              'No se pudo desactivar',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  remove(membership: Membership): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: `Se eliminará la membresía ${membership.nombre}. Esta acción no se puede deshacer.`,
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(membership.id).subscribe({
          next: () => {
            this.notify.success('Membresía eliminada');
            this.load();
          },
          error: (error: unknown) => {
            this.notify.error(
              'No se pudo eliminar',
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
