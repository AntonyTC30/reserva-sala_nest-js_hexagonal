import { BuscarReservaPorIdQuery } from './buscar-reserva-por-id.query.js';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReservaVista } from './reserva-vista.js';
import { Inject } from '@nestjs/common';
import {
  type ReservaRepository,
  ReservaRepositoryToken,
} from '../../../domain/repository/reserva.repository.js';
import { Id } from '../../../domain/vo/id.vo.js';

@QueryHandler(BuscarReservaPorIdQuery)
export class BuscarReservaPorIdHandler implements IQueryHandler<
  BuscarReservaPorIdQuery,
  ReservaVista | null
> {
  constructor(
    @Inject(ReservaRepositoryToken)
    private readonly reservaRepository: ReservaRepository,
  ) {}

  async execute(query: BuscarReservaPorIdQuery): Promise<ReservaVista | null> {
    const reserva = await this.reservaRepository.buscarPorId(
      Id.crear(query.id),
    );
    const reservaVista: ReservaVista | null = reserva
      ? {
          id: reserva.obtenerIdPrimitivo(),
          salaId: reserva.obtenerSalaIdPrimitivo(),
          solicitante: reserva.obtenerSolicitantePrimitivo(),
          inicio: reserva.obtenerRangoHorario().getInicio().toISOString(),
          fin: reserva.obtenerRangoHorario().getFin().toISOString(),
          duracion: reserva.obtenerRangoHorario().getDuracion(),
        }
      : null;

    return reservaVista;
  }
}
