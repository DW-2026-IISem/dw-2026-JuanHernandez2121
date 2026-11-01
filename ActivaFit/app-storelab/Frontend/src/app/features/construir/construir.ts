import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';

import { watchMediaQuery } from '../../core/utils/media-query';
import { Aside } from '../../layout/aside/aside';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';

@Component({
  host: { class: 'block' },
  selector: 'app-construir',
  imports: [Aside, ButtonModule, CardModule, DrawerModule, Footer, Header],
  templateUrl: './construir.html',
  styleUrl: './construir.css',
})
export class Construir {
  /** Detecta si la pantalla corresponde a escritorio. */
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');

  /** Controla la visibilidad del menú lateral en escritorio. */
  readonly sidebarCollapsed = signal(false);

  /** Controla la apertura del Drawer en dispositivos móviles. */
  readonly mobileOpen = signal(false);

  /** Título de la pantalla seleccionada. */
  readonly title = signal('Inicio');

  /** Opciones de navegación de ActivaFit. */
  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.seleccionar('Inicio'),
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      command: () => this.seleccionar('Clientes'),
    },
    {
      label: 'Planes',
      icon: 'pi pi-list',
      command: () => this.seleccionar('Planes'),
    },
    {
      label: 'Membresías',
      icon: 'pi pi-id-card',
      command: () => this.seleccionar('Membresías'),
    },
    {
      label: 'Asistencias',
      icon: 'pi pi-calendar-check',
      command: () => this.seleccionar('Asistencias'),
    },
  ];

  /** Alterna el Aside en escritorio o abre el Drawer en móvil. */
  protected onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }

  /** Actualiza el título y cierra el menú móvil. */
  protected seleccionar(titulo: string): void {
    this.title.set(titulo);
    this.mobileOpen.set(false);
  }
}
