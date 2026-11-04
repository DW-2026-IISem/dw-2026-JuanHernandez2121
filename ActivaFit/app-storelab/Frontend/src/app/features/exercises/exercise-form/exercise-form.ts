import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  Exercise,
  ExercisePayload,
  ExerciseLevel,
} from '../../../core/models/exercise.model';

import { Status } from '../../../core/models/api.model';

interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-exercise-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './exercise-form.html',
  styleUrl: './exercise-form.css',
})
export class ExerciseForm {
  readonly exercise = input<Exercise | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<ExercisePayload>();
  readonly cancelled = output<void>();

  private readonly fb = inject(FormBuilder);

  readonly levels: SelectOption<ExerciseLevel>[] = [
    { label: 'Principiante', value: 'BEGINNER' },
    { label: 'Intermedio', value: 'INTERMEDIATE' },
    { label: 'Avanzado', value: 'ADVANCED' },
  ];

  readonly statuses: SelectOption<Status>[] = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' },
  ];

  readonly form = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.maxLength(150),
    ]],
    descripcion: [''],
    tipo: ['', [
      Validators.required,
      Validators.maxLength(100),
    ]],
    nivel: ['BEGINNER' as ExerciseLevel, Validators.required],
    status: ['ACTIVE' as Status, Validators.required],
  });

  constructor() {
    effect(() => {
      const current = this.exercise();
      this.resetKey();

      this.form.reset({
        nombre: current?.nombre ?? '',
        descripcion: current?.descripcion ?? '',
        tipo: current?.tipo ?? '',
        nivel: current?.nivel ?? 'BEGINNER',
        status: current?.status ?? 'ACTIVE',
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: ExercisePayload = {
      nombre: (value.nombre ?? '').trim(),
      descripcion: value.descripcion?.trim() || null,
      tipo: (value.tipo ?? '').trim(),
      nivel: value.nivel as ExerciseLevel,
      status: value.status as Status,
    };

    if (!payload.nombre || !payload.tipo) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(payload);
  }
}
