import { Product } from '../../../domain/entities/product.entity.js';
import { ProductResponseDto } from '../../../application/dto/product-response.dto.js';
import { ProductMapper } from '../../../application/mappers/product.mapper.js';

export class ProductSerializer {
  static serialize(entity: Product): ProductResponseDto {
    return ProductMapper.toResponse(entity);
  }
}
