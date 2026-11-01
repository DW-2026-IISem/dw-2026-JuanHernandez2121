import { Component } from '@angular/core';

/**
 * Menú lateral de navegación de ActivaFit.
 *
 * ISS-01A: contiene únicamente la presentación del menú.
 * No consulta la API ni administra permisos.
 */
@Component({
  host: { class: 'block h-full' },
  selector: 'app-aside',
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {}