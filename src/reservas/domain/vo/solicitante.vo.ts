import { DomainError } from '../../../shared/domain/domain.error.js';

export class Solicitante {
  private value: string;
  private constructor(value: string) {
    this.value = value;
  }
  static crear(value: string): Solicitante {
    if (!value?.trim()) {
      throw new DomainError('El solicitante es obligatorio');
    }
    return new Solicitante(value);
  }

  getValue(): string {
    return this.value;
  }
}
