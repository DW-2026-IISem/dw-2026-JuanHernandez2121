import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [ClientsModule, TrainersModule],
  exports: [ClientsModule, TrainersModule],
})
export class BusinessModule {}
