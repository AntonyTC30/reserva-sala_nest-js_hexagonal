import { Module } from '@nestjs/common';
import { ReservasController } from '../http/reservas.controller.js';
import { CrearReservaUseCase } from '../../application/use-cases/crear-reserva.use-case.js';

@Module({
  controllers: [ReservasController],
  providers: [CrearReservaUseCase],
})
export class ReservasModule {}
