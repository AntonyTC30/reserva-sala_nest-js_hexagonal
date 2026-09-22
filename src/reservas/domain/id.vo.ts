import { DomainError } from '../../shared/domain/domain.error.js';

export class Id {
  private value: string;
  private constructor(value: string) {
    this.value = value;
  }
  static crear(value: string): Id {
    if (!value?.trim()) {
      throw new DomainError('El id es obligatorio');
    }
    return new Id(value);
  }

  getValue(): string {
    return this.value;
  }
}
