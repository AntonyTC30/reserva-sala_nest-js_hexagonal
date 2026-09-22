import { DomainError } from '../../shared/domain/domain.error.js';

export const DURACION_MAXIMA_RESERVA = 240;
export const DURACION_MINIMA_RESERVA = 30;
export const MINUTOS_EN_HORAS = 60;

export class RangoHorario {
  private inicio: Date;
  private fin: Date;

  private constructor(inicio: Date, fin: Date) {
    this.inicio = inicio;
    this.fin = fin;
  }

  static crear(inicio: Date, fin: Date): RangoHorario {
    if (!(inicio instanceof Date) || Number.isNaN(inicio.getTime())) {
      throw new DomainError('La fecha de inicio no es una fecha válida');
    }

    if (!(fin instanceof Date) || Number.isNaN(fin.getTime())) {
      throw new DomainError('La fecha de término no es una fecha válida');
    }

    if (fin.getTime() <= inicio.getTime()) {
      throw new DomainError('El término debe ser posterior al inicio');
    }

    const duracion = (fin.getTime() - inicio.getTime()) / MINUTOS_EN_HORAS;

    if (duracion < DURACION_MINIMA_RESERVA) {
      throw new DomainError(
        `Una reserva no puede durar menos de ${DURACION_MINIMA_RESERVA} minutos(se pidieron ${duracion} minutos)`,
      );
    }

    if (duracion > DURACION_MAXIMA_RESERVA) {
      throw new DomainError(
        `Una reserva no puede durar más de ${DURACION_MAXIMA_RESERVA} minutos(se pidieron ${duracion} minutos)`,
      );
    }

    return new RangoHorario(inicio, fin);
  }

  getInicio(): Date {
    return this.inicio;
  }

  getFin(): Date {
    return this.fin;
  }

  getDuracion(): number {
    return this.calcularDuracionMinutos(this.inicio, this.fin);
  }

  empiezaAntesDe(instante: Date): boolean {
    return this.inicio.getTime() < instante.getTime();
  }

  private calcularDuracionMinutos(inicio: Date, fin: Date): number {
    return (fin.getTime() - inicio.getTime()) / MINUTOS_EN_HORAS;
  }
}
