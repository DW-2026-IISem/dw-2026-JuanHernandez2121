import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';

import {
  Client,
  ClientPayload,
} from '../../../core/models/client.model';

import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';

import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';

import { ClientApi } from '../client-api.service';
import { ClientForm } from '../client-form/client-form';

@Component({
  selector: 'app-client-list',
  host: { class: 'block' },

  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    TableModule,
    EmptyState,
    PageHeader,
    StatusTag,
    ClientForm,
  ],

  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {

  private readonly api = inject(ClientApi);

  private readonly notify = inject(NotificationService);

  private readonly confirmation = inject(ConfirmationService);

  // Datos obtenidos desde el backend.
  readonly rows = signal<Client[]>([]);

  // Estados de carga y guardado.
  readonly loading = signal(true);

  readonly saving = signal(false);

  // Mensaje de error.
  readonly error = signal<string | null>(null);

  // Texto del buscador.
  readonly filter = signal('');

  // Clientes filtrados automáticamente.
  readonly visibleRows = computed(() =>
    filterRows(
      this.rows(),
      this.filter(),
      (client) => [
        client.name,
        client.email,
        client.phone,
        client.address,
      ],
    ),
  );

  // Estado del diálogo.
  readonly dialogVisible = signal(false);

  // Cliente seleccionado para edición.
  readonly editing = signal<Client | null>(null);

  // Llave para reiniciar el formulario.
  readonly resetKey = signal(0);

  // Título dinámico del diálogo.
  readonly title = computed(() =>
    this.editing()
      ? 'Editar cliente'
      : 'Nuevo cliente',
  );

  constructor() {
    this.load();
  }

  /**
   * Obtiene los clientes desde GET /api/clientes.
   */
  load(): void {

    this.loading.set(true);

    this.error.set(null);

    this.api.list().subscribe({

      next: (rows) => {
        this.rows.set(rows);
        this.loading.set(false);
      },

      error: (error: unknown) => {
        this.rows.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },

    });
  }

  /**
   * Abre el formulario para crear un cliente.
   */
  openCreate(): void {

    this.editing.set(null);

    this.resetKey.update((key) => key + 1);

    this.dialogVisible.set(true);
  }

  /**
   * Abre el formulario para editar un cliente.
   */
  openEdit(client: Client): void {

    this.editing.set(client);

    this.resetKey.update((key) => key + 1);

    this.dialogVisible.set(true);
  }

  /**
   * Guarda un cliente nuevo o actualiza uno existente.
   */
  save(payload: ClientPayload): void {

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
          current
            ? 'Cliente actualizado'
            : 'Cliente creado',
        );

        this.load();
      },

      error: (error: unknown) => {

        this.saving.set(false);

        this.notify.error(
          'No se pudo guardar',
          toApiMessage(error),
        );
      },

    });
  }

  /**
   * Solicita confirmación antes de desactivar un cliente.
   */
  confirmDeactivate(client: Client): void {

    this.confirmation.confirm({

      header: 'Desactivar cliente',

      message: `¿Estás seguro de que deseas desactivar a ${client.name}?`,

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Sí, desactivar',

      rejectLabel: 'Cancelar',

      acceptButtonStyleClass: 'p-button-danger',

      accept: () => this.deactivate(client),

    });
  }

  /**
   * Ejecuta la baja lógica mediante PATCH /deactivate.
   */
  private deactivate(client: Client): void {

    this.api.deactivate(client.id).subscribe({

      next: () => {

        this.notify.success(
          'Cliente desactivado',
          `${client.name} fue desactivado correctamente.`,
        );

        this.load();
      },

      error: (error: unknown) => {

        this.notify.error(
          'No se pudo desactivar',
          toApiMessage(error),
        );
      },

    });
  }

  /**
   * Cierra el diálogo.
   */
  closeDialog(): void {

    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
  }
}
