
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';

import { Routine, RoutinePayload } from '../../../core/models/routine.model';
import { Trainer } from '../../../core/models/trainer.model';
import { Client } from '../../../core/models/client.model';
import { Exercise } from '../../../core/models/exercise.model';

import { TrainerApi } from '../../trainers/trainer-api.service';
import { ClientApi } from '../../clients/client-api.service';
import { ExerciseApi } from '../../exercises/exercise-api.service';

interface SelectOption {
  label: string;
  value: number;
}

export interface RoutineFormPayload extends RoutinePayload {
  ejercicioIds: number[];
}

@Component({
  selector: 'app-routine-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
  ],
  templateUrl: './routine-form.html',
  styleUrl: './routine-form.css',
})
export class RoutineForm {
  readonly routine = input<Routine | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);
  readonly initialExerciseIds = input<number[]>([]);

  readonly saved = output<RoutineFormPayload>();
  readonly cancelled = output<void>();

  readonly trainers = signal<SelectOption[]>([]);
  readonly clients = signal<SelectOption[]>([]);
  readonly exercises = signal<SelectOption[]>([]);

  readonly loadingOptions = signal(true);
  readonly optionsError = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly trainerApi = inject(TrainerApi);
  private readonly clientApi = inject(ClientApi);
  private readonly exerciseApi = inject(ExerciseApi);

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: [''],
    entrenadorId: [null as number | null],
    clienteId: [null as number | null],
    ejercicioIds: [[] as number[]],
  });

  constructor() {
    this.loadOptions();

    effect(() => {
      const current = this.routine();
      this.resetKey();

      this.form.reset({
        nombre: current?.nombre ?? '',
        descripcion: current?.descripcion ?? '',
        entrenadorId: current?.entrenadorId ?? null,
        clienteId: current?.clienteId ?? null,
        ejercicioIds: [...this.initialExerciseIds()],
      });
    });
  }

  private loadOptions(): void {
    this.loadingOptions.set(true);
    this.optionsError.set('');

    forkJoin({
      trainers: this.trainerApi.list(),
      clients: this.clientApi.list(),
      exercises: this.exerciseApi.list(),
    }).subscribe({
      next: ({ trainers, clients, exercises }) => {
        this.trainers.set(
          trainers
            .filter((trainer: Trainer) =>
              trainer.status.toUpperCase() === 'ACTIVE',
            )
            .map(trainer => ({
              label: trainer.nombre,
              value: trainer.id,
            })),
        );

        this.clients.set(
          clients
            .filter((client: Client) =>
              client.status.toUpperCase() === 'ACTIVE',
            )
            .map(client => ({
              label: client.name,
              value: client.id,
            })),
        );

        this.exercises.set(
          exercises
            .filter((exercise: Exercise) =>
              exercise.status.toUpperCase() === 'ACTIVE',
            )
            .map(exercise => ({
              label: `${exercise.nombre} - ${exercise.tipo}`,
              value: exercise.id,
            })),
        );

        this.loadingOptions.set(false);
      },
      error: () => {
        this.optionsError.set(
          'No fue posible cargar los entrenadores, clientes y ejercicios.',
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

    const payload: RoutineFormPayload = {
      nombre: (value.nombre ?? '').trim(),
      descripcion: value.descripcion?.trim() || null,
      entrenadorId: value.entrenadorId,
      clienteId: value.clienteId,
      ejercicioIds: value.ejercicioIds ?? [],
    };

    this.saved.emit(payload);
  }
}
