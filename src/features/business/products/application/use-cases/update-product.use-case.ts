import { Inject, Injectable } from '@nestjs/common';

import { ProductTypeNotFoundException } from '../../../product-types/domain/exceptions/product-type-not-found.exception.js';

import {
  type IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../../product-types/domain/interfaces/product-type-repository.interface.js';

import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception.js';

import {
  type IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product-repository.interface.js';

import { UpdateProductDto } from '../dto/update-product.dto.js';

import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,

    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    if (dto.productTypeId) {
      const productType = await this.productTypeRepository.findById(
        dto.productTypeId,
      );

      if (!productType) {
        throw new ProductTypeNotFoundException(dto.productTypeId);
      }
    }

    product.update(dto);

    const updated = await this.productRepository.update(product);

    return ProductMapper.toResponse(updated);
  }
}
