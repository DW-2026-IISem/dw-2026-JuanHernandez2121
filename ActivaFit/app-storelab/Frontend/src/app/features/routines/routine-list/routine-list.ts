
import { Component, computed, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';

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
import { Exercise } from '../../../core/models/exercise.model';
import { RoutineExercise } from '../../../core/models/routine-exercise.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { RoutineApi } from '../routine-api.service';
import { RoutineForm, RoutineFormPayload } from '../routine-form/routine-form';
import { TrainerApi } from '../../trainers/trainer-api.service';
import { ClientApi } from '../../clients/client-api.service';
import { ExerciseApi } from '../../exercises/exercise-api.service';
import { RoutineExerciseApi } from '../../routine-exercises/routine-exercise-api.service';

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
  private readonly exerciseApi = inject(ExerciseApi);
  private readonly routineExerciseApi = inject(RoutineExerciseApi);

  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Routine[]>([]);
  readonly trainers = signal<Trainer[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly exercises = signal<Exercise[]>([]);
  readonly routineExercises = signal<RoutineExercise[]>([]);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Routine | null>(null);
  readonly resetKey = signal(0);

  readonly editingExerciseIds = computed(() => {
    const routine = this.editing();

    if (!routine) return [];

    return this.routineExercises()
      .filter(relation => relation.rutinaId === routine.id)
      .map(relation => relation.ejercicioId);
  });

  readonly title = computed(() =>
    this.editing() ? 'Editar rutina' : 'Nueva rutina',
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      routine => [
        routine.nombre,
        routine.descripcion,
        this.trainerName(routine.entrenadorId),
        this.clientName(routine.clienteId),
        this.exerciseNames(routine.id),
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
      exercises: this.exerciseApi.list(),
      routineExercises: this.routineExerciseApi.list(),
    }).subscribe({
      next: ({
        routines,
        trainers,
        clients,
        exercises,
        routineExercises,
      }) => {
        this.rows.set(routines);
        this.trainers.set(trainers);
        this.clients.set(clients);
        this.exercises.set(exercises);
        this.routineExercises.set(routineExercises);
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

  exerciseNames(routineId: number): string {
    const ids = this.routineExercises()
      .filter(relation => relation.rutinaId === routineId)
      .map(relation => relation.ejercicioId);

    if (ids.length === 0) return 'Sin ejercicios asignados';

    return ids
      .map(id =>
        this.exercises().find(exercise => exercise.id === id)?.nombre
          ?? `Ejercicio #${id}`,
      )
      .join(', ');
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

  save(payload: RoutineFormPayload): void {
    const current = this.editing();
    const { ejercicioIds, ...routinePayload } = payload;

    this.saving.set(true);

    const request = current
      ? this.api.update(current.id, routinePayload)
      : this.api.create(routinePayload);

    request.subscribe({
      next: savedRoutine => {
        this.syncExercises(savedRoutine.id, ejercicioIds).subscribe({
          next: () => {
            this.saving.set(false);
            this.dialogVisible.set(false);

            this.notify.success(
              current
                ? 'Rutina actualizada correctamente'
                : 'Rutina creada correctamente',
            );

            this.load();
          },
          error: (error: unknown) => {
            this.saving.set(false);
            this.dialogVisible.set(false);

            this.notify.error(
              'La rutina se guardó, pero hubo un problema actualizando sus ejercicios',
              toApiMessage(error),
            );

            this.load();
          },
        });
      },
      error: (error: unknown) => {
        this.saving.set(false);

        this.notify.error(
          'No se pudo guardar la rutina',
          toApiMessage(error),
        );
      },
    });
  }

  private syncExercises(
    rutinaId: number,
    selectedIds: number[],
  ) {
    const currentRelations = this.routineExercises()
      .filter(relation => relation.rutinaId === rutinaId);

    const selectedSet = new Set(selectedIds);

    const requests = [
      ...currentRelations
        .filter(relation => !selectedSet.has(relation.ejercicioId))
        .map(relation => this.routineExerciseApi.deactivate(relation.id)),

      ...selectedIds
        .filter(
          id => !currentRelations.some(
            relation => relation.ejercicioId === id,
          ),
        )
        .map(ejercicioId =>
          this.routineExerciseApi.create({
            rutinaId,
            ejercicioId,
            status: 'active',
          }),
        ),
    ];

    return requests.length > 0 ? forkJoin(requests) : of([]);
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
