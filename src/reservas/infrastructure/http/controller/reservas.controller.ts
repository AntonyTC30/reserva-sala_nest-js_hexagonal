import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CrearReservaDto } from '../dto/crear-reserva.dto.js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuscarReservaPorIdQuery } from '../../../application/use-cases/queries/buscar-reserva-por-id.query.js';
import { CrearReservaCommand } from '../../../application/use-cases/commands/crear-reserva.command.js';

@Controller('reservas')
export class ReservasController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async crear(@Body() dto: CrearReservaDto) {
    const reserva = await this.commandBus.execute(
      new CrearReservaCommand(
        randomUUID(),
        dto.salaId,
        dto.solicitante,
        new Date(dto.inicio),
        new Date(dto.fin),
      ),
    );
    return reserva;
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const reserva = await this.queryBus.execute(
      new BuscarReservaPorIdQuery(id),
    );

    if (!reserva) {
      throw new NotFoundException('No existe la reserva ${id}');
    }
    return reserva;
  }
}
