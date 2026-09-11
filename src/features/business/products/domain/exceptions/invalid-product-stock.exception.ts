import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InvalidProductStockException extends DomainException {
  constructor(stock: number) {
    super(`El stock '${stock}' no puede ser negativo`);
  }
}
