import { Component, computed, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Status } from '../../../core/models/api.model';

@Component({
  selector: 'app-status-tag',
  host: { class: 'inline-block' },
  imports: [TagModule],
  templateUrl: './status-tag.html',
  styleUrl: './status-tag.css',
})
export class StatusTag {
  readonly status = input.required<Status>();

  readonly label = computed(() => {
    const value = this.status().toLowerCase();
    return value === 'active' ? 'Activo' : 'Inactivo';
  });

  readonly severity = computed<'success' | 'danger'>(() => {
    const value = this.status().toLowerCase();
    return value === 'active' ? 'success' : 'danger';
  });
}
