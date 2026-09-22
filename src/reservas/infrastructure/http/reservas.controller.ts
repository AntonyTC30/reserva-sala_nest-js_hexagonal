import { Body, Controller, Post } from '@nestjs/common';
import { CrearReservaUseCase } from '../../application/use-cases/crear-reserva.use-case.js';
import { randomUUID } from 'crypto';
import { CrearReservaDto } from './crear-reserva.dto.js';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly crearReserva: CrearReservaUseCase) {}

  @Post()
  async crear(@Body() dto: CrearReservaDto) {
    const reserva = await this.crearReserva.ejecutar({
      id: randomUUID(),
      salaId: dto.salaId,
      solicitante: dto.solicitante,
      fechaInicio: new Date(dto.inicio),
      fechaFin: new Date(dto.fin),
    });
    return reserva;
  }
}
