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
  Attendance,
  AttendancePayload,
} from '../../../core/models/attendance.model';
import { Membership } from '../../../core/models/membership.model';
import { Client } from '../../../core/models/client.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { AttendanceApi } from '../attendance-api.service';
import { AttendanceForm } from '../attendance-form/attendance-form';
import { MembershipApi } from '../../memberships/membership-api.service';
import { ClientApi } from '../../clients/client-api.service';

@Component({
  selector: 'app-attendance-list',
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
    AttendanceForm,
  ],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css',
})
export class AttendanceList {
  private readonly api = inject(AttendanceApi);
  private readonly membershipApi = inject(MembershipApi);
  private readonly clientApi = inject(ClientApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Attendance[]>([]);
  readonly memberships = signal<Membership[]>([]);
  readonly clients = signal<Client[]>([]);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Attendance | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar asistencia' : 'Nueva asistencia',
  );

  readonly activeAttendanceCount = computed(
    () => this.rows().filter(
      attendance => attendance.status.toLowerCase() === 'active',
    ).length,
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      attendance => [
        this.clientName(attendance.membresiaId),
        this.membershipName(attendance.membresiaId),
        attendance.fecha,
        attendance.observaciones,
        attendance.status,
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
      attendances: this.api.list(),
      memberships: this.membershipApi.list(),
      clients: this.clientApi.list(),
    }).subscribe({
      next: ({ attendances, memberships, clients }) => {
        this.rows.set(attendances);
        this.memberships.set(memberships);
        this.clients.set(clients);
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

  clientName(membershipId: number): string {
    const membership = this.memberships().find(
      item => item.id === membershipId,
    );

    if (!membership) {
      return `Membresía #${membershipId}`;
    }

    return this.clients().find(
      client => client.id === membership.clienteId,
    )?.name ?? `Cliente #${membership.clienteId}`;
  }

  formatDate(value: string): string {
    const datePart = value.split('T')[0];
    const parts = datePart.split('-');

    if (parts.length !== 3) {
      return value;
    }

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(attendance: Attendance): void {
    this.editing.set(attendance);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: AttendancePayload): void {
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
          current ? 'Asistencia actualizada' : 'Asistencia registrada',
        );

        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(attendance: Attendance): void {
    this.confirmation.confirm({
      header: 'Desactivar asistencia',
      message: `¿Deseas desactivar la asistencia del ${this.formatDate(attendance.fecha)}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.api.deactivate(attendance.id).subscribe({
          next: () => {
            this.notify.warn('Asistencia desactivada');
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

  remove(attendance: Attendance): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: 'Esta asistencia se eliminará permanentemente. Esta acción no se puede deshacer.',
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(attendance.id).subscribe({
          next: () => {
            this.notify.success('Asistencia eliminada');
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
