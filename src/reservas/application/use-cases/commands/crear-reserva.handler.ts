import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReservaVista } from '../queries/reserva-vista.js';
import { CrearReservaCommand } from './crear-reserva.command.js';
import { Inject } from '@nestjs/common';
import {
  type ReservaRepository,
  ReservaRepositoryToken,
} from '../../../domain/repository/reserva.repository.js';
import { Reserva } from '../../../domain/reserva.js';
import { DomainError } from '../../../../shared/domain/domain.error.js';

@CommandHandler(CrearReservaCommand)
export class CrearReservaHandler implements ICommandHandler<
  CrearReservaCommand,
  ReservaVista
> {
  constructor(
    @Inject(ReservaRepositoryToken)
    private readonly reservaRepository: ReservaRepository,
  ) {}
  async execute(command: CrearReservaCommand): Promise<ReservaVista> {
    const reserva = Reserva.crear({
      id: command.id,
      salaId: command.salaId,
      solicitante: command.solicitante,
      fechaInicio: command.fechaInicio,
      fechaFin: command.fechaFin,
    });

    const existentes = await this.reservaRepository.buscarPorSala(
      reserva.obtenerSalaId(),
    );

    const choque = existentes.find((otraReserva) =>
      otraReserva.chocaCon(reserva),
    );

    if (choque) {
      throw new DomainError(
        `Ya existe una reserva para la sala ${reserva.obtenerSalaIdPrimitivo()} en el rango de horario `,
      );
    }

    await this.reservaRepository.guardar(reserva);

    return {
      id: reserva.obtenerIdPrimitivo(),
      salaId: reserva.obtenerSalaIdPrimitivo(),
      solicitante: reserva.obtenerSolicitantePrimitivo(),
      inicio: reserva.obtenerRangoHorario().getInicio().toISOString(),
      fin: reserva.obtenerRangoHorario().getFin().toISOString(),
      duracion: reserva.obtenerRangoHorario().getDuracion(),
    };
  }
}
