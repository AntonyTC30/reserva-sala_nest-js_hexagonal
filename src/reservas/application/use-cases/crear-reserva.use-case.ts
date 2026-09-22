import { Inject, Injectable } from '@nestjs/common';
import {
  type ReservaRepository,
  ReservaRepositoryToken,
} from '../../domain/reserva.repository.js';
import { Reserva } from '../../domain/reserva.js';
import { console } from 'inspector';
import { DomainError } from '../../../shared/domain/domain.error.js';

interface CrearReservaParams {
  id: string;
  salaId: string;
  solicitante: string;
  fechaInicio: Date;
  fechaFin: Date;
}

@Injectable()
export class CrearReservaUseCase {
  constructor(
    @Inject(ReservaRepositoryToken)
    private readonly reservaRepository: ReservaRepository,
  ) {}

  async ejecutar(params: CrearReservaParams): Promise<Reserva> {
    const { id, salaId, solicitante, fechaInicio, fechaFin } = params;

    const reserva = Reserva.crear({
      id: id,
      salaId: salaId,
      solictante: solicitante,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
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

    return reserva;
  }
}
