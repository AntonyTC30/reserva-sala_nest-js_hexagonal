import { DomainError } from '../../shared/domain/domain.error.js';
import { Id } from './id.vo.js';
import { RangoHorario } from './rango-horario.vo.js';
import { SalaId } from './sala-id.vo.js';
import { Solicitante } from './solicitante.vo.js';

export class Reserva {
  private id: Id;
  private salaId: SalaId;
  private solictante: Solicitante;
  private rangoHorario: RangoHorario;

  private constructor(
    id: Id,
    salaId: SalaId,
    solictante: Solicitante,
    rangoHorario: RangoHorario,
  ) {
    this.id = id;
    this.salaId = salaId;
    this.solictante = solictante;
    this.rangoHorario = rangoHorario;
  }

  static crear(params: {
    id: string;
    salaId: string;
    solictante: string;
    fechaInicio: Date;
    fechaFin: Date;
  }): Reserva {
    const { id, salaId, solictante, fechaInicio, fechaFin } = params;

    const idVO = Id.crear(id);
    const salaIdVO = SalaId.crear(salaId);
    const solictanteVO = Solicitante.crear(solictante);

    const rangoHorario = RangoHorario.crear(fechaInicio, fechaFin);

    return new Reserva(idVO, salaIdVO, solictanteVO, rangoHorario);
  }

  static reconstituir(params: {
    id: string;
    salaId: string;
    solictante: string;
    fechaInicio: Date;
    fechaFin: Date;
  }): Reserva {
    const { id, salaId, solictante, fechaInicio, fechaFin } = params;

    const idVO = Id.crear(id);
    const salaIdVO = SalaId.crear(salaId);
    const solictanteVO = Solicitante.crear(solictante);

    const rangoHorario = RangoHorario.crear(fechaInicio, fechaFin);

    return new Reserva(idVO, salaIdVO, solictanteVO, rangoHorario);
  }
}
