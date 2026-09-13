import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module.js';
import { ProductTypesModule } from './product-types/product-types.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
  ],
  exports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
  ],
})
export class BusinessModule {}
