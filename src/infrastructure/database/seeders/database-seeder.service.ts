import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder';
import { seedTrainers } from '../../../features/business/trainers/infrastructure/persistence/seeders/trainers.seeder';

/**
 * Ejecuta seeders en orden de dependencias.
 * Solo en entornos no productivos.
 */
@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederService.name);

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    try {
      await seedClients();
      await seedTrainers();
      this.logger.log('✅ Seeders ejecutados');
    } catch (error: any) {
      this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);
      throw error;
    }
  }
}
