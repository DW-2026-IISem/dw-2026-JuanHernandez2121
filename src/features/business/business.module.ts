import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { AttendancesModule } from './attendances/attendances.module';

@Module({
  imports: [ClientsModule, AttendancesModule],
  exports: [ClientsModule, AttendancesModule],
})
export class BusinessModule {}
