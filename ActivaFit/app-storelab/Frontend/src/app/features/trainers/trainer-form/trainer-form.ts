import { Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { Status } from '../../../core/models/api.model';
import { Trainer, TrainerPayload } from '../../../core/models/trainer.model';

@Component({
  host: { class: 'block' },
  selector: 'app-trainer-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './trainer-form.html',
})
export class TrainerForm {
  readonly trainer = input<Trainer | null>(null);

  /** Permite reiniciar el formulario al abrir uno nuevo. */
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<TrainerPayload>();
  readonly cancelled = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' },
  ];

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: [''],
    status: ['ACTIVE' as Status, [Validators.required]],
  });

  constructor() {
    effect(() => {
      const current = this.trainer();
      this.resetKey();

      this.form.reset({
        nombre: current?.nombre ?? '',
        descripcion: current?.descripcion ?? '',
        status: current?.status ?? 'ACTIVE',
      });

      // El estado se modifica mediante la operación de desactivación.
      if (current) {
        this.form.controls.status.disable();
      } else {
        this.form.controls.status.enable();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.saved.emit({
      nombre: value.nombre.trim(),
      descripcion: value.descripcion.trim() || null,
      ...(this.trainer() ? {} : { status: value.status }),
    });
  }
}
