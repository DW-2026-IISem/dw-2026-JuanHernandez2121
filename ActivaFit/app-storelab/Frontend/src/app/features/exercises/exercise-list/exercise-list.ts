import { Component, computed, inject, signal } from '@angular/core';

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
  Exercise,
  ExercisePayload,
} from '../../../core/models/exercise.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { ExerciseApi } from '../exercise-api.service';
import { ExerciseForm } from '../exercise-form/exercise-form';

@Component({
  selector: 'app-exercise-list',
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
    ExerciseForm,
  ],
  templateUrl: './exercise-list.html',
  styleUrl: './exercise-list.css',
})
export class ExerciseList {
  private readonly api = inject(ExerciseApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Exercise[]>([]);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly dialogVisible = signal(false);
  readonly editing = signal<Exercise | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar ejercicio' : 'Nuevo ejercicio',
  );

  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      exercise => [
        exercise.nombre,
        exercise.descripcion,
        exercise.tipo,
        exercise.nivel,
        this.levelName(exercise.nivel),
      ],
    ),
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.list().subscribe({
      next: exercises => {
        this.rows.set(exercises);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  levelName(level: Exercise['nivel']): string {
    const names: Record<Exercise['nivel'], string> = {
      BEGINNER: 'Principiante',
      INTERMEDIATE: 'Intermedio',
      ADVANCED: 'Avanzado',
    };

    return names[level];
  }

  levelSeverity(
    level: Exercise['nivel'],
  ): 'success' | 'info' | 'warn' {
    switch (level) {
      case 'BEGINNER':
        return 'success';
      case 'INTERMEDIATE':
        return 'info';
      case 'ADVANCED':
        return 'warn';
    }
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(exercise: Exercise): void {
    this.editing.set(exercise);
    this.resetKey.update(key => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: ExercisePayload): void {
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
          current ? 'Ejercicio actualizado' : 'Ejercicio creado',
        );

        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(exercise: Exercise): void {
    this.confirmation.confirm({
      header: 'Desactivar ejercicio',
      message: `¿Deseas desactivar el ejercicio ${exercise.nombre}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.api.deactivate(exercise.id).subscribe({
          next: () => {
            this.notify.warn('Ejercicio desactivado');
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

  remove(exercise: Exercise): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: `Se eliminará el ejercicio ${exercise.nombre}. Esta acción no se puede deshacer.`,
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(exercise.id).subscribe({
          next: () => {
            this.notify.success('Ejercicio eliminado');
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
