import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [ClientsModule, PlansModule, MembershipsModule],
  exports: [ClientsModule, PlansModule, MembershipsModule],
})
export class BusinessModule {}
