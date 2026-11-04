import { Component, computed, inject, signal } from '@angular/core';
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

import { Routine, RoutinePayload } from '../../../core/models/routine.model';
import { Trainer } from '../../../core/models/trainer.model';
import { Client } from '../../../core/models/client.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { RoutineApi } from '../routine-api.service';
import { RoutineForm } from '../routine-form/routine-form';
import { TrainerApi } from '../../trainers/trainer-api.service';
import { ClientApi } from '../../clients/client-api.service';

@Component({
  selector: 'app-routine-list',
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
    RoutineForm,
  ],
  templateUrl: './routine-list.html',
  styleUrl: './routine-list.css',
})
export class RoutineList {
  private readonly api = inject(RoutineApi);
  private readonly trainerApi = inject(TrainerApi);
  private readonly clientApi = inject(ClientApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Routine[]>([]);
  readonly trainers = signal<Trainer[]>([]);
  readonly clients = signal<Client[]>([]);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Routine | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar rutina' : 'Nueva rutina',
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      (routine) => [
        routine.nombre,
        routine.descripcion,
        this.trainerName(routine.entrenadorId),
        this.clientName(routine.clienteId),
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
      routines: this.api.list(),
      trainers: this.trainerApi.list(),
      clients: this.clientApi.list(),
    }).subscribe({
      next: ({ routines, trainers, clients }) => {
        this.rows.set(routines);
        this.trainers.set(trainers);
        this.clients.set(clients);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  trainerName(trainerId: number | null): string {
    if (trainerId === null) return 'Sin asignar';

    return this.trainers().find(trainer => trainer.id === trainerId)?.nombre
      ?? `Entrenador #${trainerId}`;
  }

  clientName(clientId: number | null): string {
    if (clientId === null) return 'Sin asignar';

    return this.clients().find(client => client.id === clientId)?.name
      ?? `Cliente #${clientId}`;
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(routine: Routine): void {
    this.editing.set(routine);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: RoutinePayload): void {
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
          current ? 'Rutina actualizada' : 'Rutina creada',
        );

        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(routine: Routine): void {
    this.confirmation.confirm({
      header: 'Desactivar rutina',
      message: `¿Desactivar la rutina ${routine.nombre}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.api.deactivate(routine.id).subscribe({
          next: () => {
            this.notify.warn('Rutina desactivada');
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

  remove(routine: Routine): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: `Se eliminará la rutina ${routine.nombre}. Esta acción no se puede deshacer.`,
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(routine.id).subscribe({
          next: () => {
            this.notify.success('Rutina eliminada');
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
    if (this.saving()) return;

    this.dialogVisible.set(false);
  }
}
