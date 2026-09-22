import { DomainError } from '../../shared/domain/domain.error.js';

export class SalaId {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }
  static crear(value: string): SalaId {
    if (!value?.trim()) {
      throw new DomainError('El id de la sala es obligatorio');
    }
    return new SalaId(value);
  }
}
