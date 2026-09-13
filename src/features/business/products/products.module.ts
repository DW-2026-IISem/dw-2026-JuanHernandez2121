import { Module } from '@nestjs/common';

import { ProductTypesModule } from '../product-types/product-types.module.js';

import {
  PRODUCT_REPOSITORY,
} from './domain/interfaces/product-repository.interface.js';

import { ProductRepository } from './infrastructure/persistence/repositories/product.repository.js';

import { CreateProductUseCase } from './application/use-cases/create-product.use-case.js';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case.js';
import { GetProductUseCase } from './application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case.js';

import { ProductsController } from './presentation/http/controllers/products.controller.js';

@Module({
  imports: [ProductTypesModule],
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    {
      provide: PRODUCT_REPOSITORY,
      useExisting: ProductRepository,
    },
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductsModule {}
