import { DomainError } from '../../shared/domain/domain.error.js';
import { Id } from './vo/id.vo.js';
import { RangoHorario } from './vo/rango-horario.vo.js';
import { SalaId } from './vo/sala-id.vo.js';
import { Solicitante } from './vo/solicitante.vo.js';

export class Reserva {
  private id: Id;
  private salaId: SalaId;
  private solicitante: Solicitante;
  private rangoHorario: RangoHorario;

  private constructor(
    id: Id,
    salaId: SalaId,
    solicitante: Solicitante,
    rangoHorario: RangoHorario,
  ) {
    this.id = id;
    this.salaId = salaId;
    this.solicitante = solicitante;
    this.rangoHorario = rangoHorario;
  }

  static crear(params: {
    id: string;
    salaId: string;
    solicitante: string;
    fechaInicio: Date;
    fechaFin: Date;
  }): Reserva {
    const { id, salaId, solicitante, fechaInicio, fechaFin } = params;

    const idVO = Id.crear(id);
    const salaIdVO = SalaId.crear(salaId);
    const solicitanteVO = Solicitante.crear(solicitante);

    const rangoHorario = RangoHorario.crear(fechaInicio, fechaFin);

    return new Reserva(idVO, salaIdVO, solicitanteVO, rangoHorario);
  }

  static reconstituir(params: {
    id: string;
    salaId: string;
    solicitante: string;
    fechaInicio: Date;
    fechaFin: Date;
  }): Reserva {
    const { id, salaId, solicitante, fechaInicio, fechaFin } = params;

    const idVO = Id.crear(id);
    const salaIdVO = SalaId.crear(salaId);
    const solicitanteVO = Solicitante.crear(solicitante);
    const rangoHorario = RangoHorario.crear(fechaInicio, fechaFin);

    return new Reserva(idVO, salaIdVO, solicitanteVO, rangoHorario);
  }

  obtenerSalaId(): SalaId {
    return this.salaId;
  }

  esDeLaMismaSala(otraReserva: Reserva): boolean {
    return this.salaId.getValue() === otraReserva.obtenerSalaId().getValue();
  }

  obtenerSalaIdPrimitivo(): string {
    return this.salaId.getValue();
  }

  obtenerIdPrimitivo(): string {
    return this.id.getValue();
  }

  obtenerSolicitantePrimitivo(): string {
    return this.solicitante.getValue();
  }

  obtenerRangoHorario(): RangoHorario {
    return this.rangoHorario;
  }

  chocaCon(otraReserva: Reserva): boolean {
    if (this.obtenerIdPrimitivo() === otraReserva.obtenerIdPrimitivo()) {
      return false;
    }
    return true;
  }
}
