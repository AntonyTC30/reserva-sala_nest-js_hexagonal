import { Reserva } from '../../../domain/reserva.js';
import { ReservaOrmEntity } from '../orm/reserva.orm-entity.js';

export class ReservaMapper {
  static aDomain(fila: ReservaOrmEntity): Reserva {
    return Reserva.reconstituir({
      id: fila.id,
      salaId: fila.salaId,
      solicitante: fila.solicitante,
      fechaInicio: new Date(fila.fechaInicio),
      fechaFin: new Date(fila.fechaFin),
    });
  }

  static aPersistencia(reserva: Reserva): ReservaOrmEntity {
    const fila = new ReservaOrmEntity();

    fila.id = reserva.obtenerIdPrimitivo();
    fila.salaId = reserva.obtenerSalaIdPrimitivo();
    fila.solicitante = reserva.obtenerSolicitantePrimitivo();
    fila.fechaInicio = reserva.obtenerRangoHorario().getInicio();
    fila.fechaFin = reserva.obtenerRangoHorario().getFin();

    return fila;
  }
}
