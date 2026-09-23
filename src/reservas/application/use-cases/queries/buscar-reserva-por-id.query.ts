import { Query } from '@nestjs/cqrs';
import { ReservaVista } from './reserva-vista.js';

export class BuscarReservaPorIdQuery extends Query<ReservaVista | null> {
  constructor(public readonly id: string) {
    super();
  }
}
