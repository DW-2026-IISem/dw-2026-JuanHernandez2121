import { Component } from '@angular/core';

/**
 * Pie de página de ActivaFit.
 *
 * Componente de presentación:
 * no tiene estado ni depende de servicios.
 */
@Component({
  host: { class: 'block' },
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}