import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from '../http/controller/reservas.controller.js';
import { ReservaRepositoryToken } from '../../domain/repository/reserva.repository.js';
import { ReservaTypeormRepository } from '../database/repository/reserva-typeorm.repository.js';
import { ReservaOrmEntity } from '../database/orm/reserva.orm-entity.js';
import { BuscarReservaPorIdHandler } from '../../application/use-cases/queries/buscar-reserva-por-id.handler.js';
import { CqrsModule } from '@nestjs/cqrs';
import { CrearReservaHandler } from '../../application/use-cases/commands/crear-reserva.handler.js';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ReservaOrmEntity])],
  controllers: [ReservasController],
  providers: [
    BuscarReservaPorIdHandler,
    CrearReservaHandler,
    { provide: ReservaRepositoryToken, useClass: ReservaTypeormRepository },
  ],
})
export class ReservasModule {}
