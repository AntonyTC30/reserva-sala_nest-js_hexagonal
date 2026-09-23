import { Command } from '@nestjs/cqrs';
import { ReservaVista } from '../queries/reserva-vista.js';

export class CrearReservaCommand extends Command<ReservaVista> {
  constructor(
    public readonly id: string,
    public readonly salaId: string,
    public readonly solicitante: string,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date,
  ) {
    super();
  }
}
