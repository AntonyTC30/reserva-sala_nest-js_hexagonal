import { Id } from './id.vo.js';
import { Reserva } from './reserva.js';
import { SalaId } from './sala-id.vo.js';

export interface ReservaRepository {
  buscarPorSala(salaId: SalaId): Promise<Reserva[]>;
  guardar(reserva: Reserva): Promise<void>;
  buscarPorId(id: Id): Promise<Reserva | null>;

  //   buscarPorSolicitante(solicitante: Solicitante): Promise<Reserva[]>;
  //   buscarPorRangoHorario(rangoHorario: RangoHorario): Promise<Reserva[]>;
}
