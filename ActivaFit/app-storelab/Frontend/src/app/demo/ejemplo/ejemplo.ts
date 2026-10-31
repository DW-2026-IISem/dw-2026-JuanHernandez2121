import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css',
})
export class Ejemplo {
  plan = {
    nombre: 'Plan Mensual',
    descripcion: 'Acceso a las instalaciones del gimnasio durante 30 días.',
    precio: '$ 89.900 COP',
    duracion: '30 días',
    estado: 'Activo',
  };

  mensaje = '';

  verDetalles(): void {
    this.mensaje = 'Estás consultando los detalles del Plan Mensual.';
  }

  consultarPlan(): void {
    this.mensaje = 'El Plan Mensual está disponible para consulta.';
  }
}
