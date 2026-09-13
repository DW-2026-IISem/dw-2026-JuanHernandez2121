import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [ClientsModule, PlansModule],
  exports: [ClientsModule, PlansModule],
})
export class BusinessModule {}
