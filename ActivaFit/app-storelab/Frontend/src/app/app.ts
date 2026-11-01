import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente principal de ActivaFit.
 *
 * El router selecciona qué componente se muestra
 * dentro de RouterOutlet según la URL.
 */
@Component({
  host: { class: 'block' },
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
