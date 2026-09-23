import { Injectable } from '@nestjs/common';
import type { Id } from '../../../domain/vo/id.vo.js';
import { Reserva } from '../../../domain/reserva.js';
import { ReservaRepository } from '../../../domain/repository/reserva.repository.js';
import { SalaId } from '../../../domain/vo/sala-id.vo.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaOrmEntity } from '../orm/reserva.orm-entity.js';
import { ReservaMapper } from '../mapper/reserva.mapper.js';

@Injectable()
export class ReservaTypeormRepository implements ReservaRepository {
  constructor(
    @InjectRepository(ReservaOrmEntity)
    private readonly repository: Repository<ReservaOrmEntity>,
  ) {}

  async buscarPorSala(salaId: SalaId): Promise<Reserva[]> {
    const salaReservadas = await this.repository.find({
      where: { salaId: salaId.getValue() },
    });
    return salaReservadas.map((fila) => ReservaMapper.aDomain(fila));
  }

  async guardar(reserva: Reserva): Promise<void> {
    await this.repository.save(ReservaMapper.aPersistencia(reserva));
  }

  async buscarPorId(id: Id): Promise<Reserva | null> {
    const fila = await this.repository.findOne({
      where: { id: id.getValue() },
    });
    return fila ? ReservaMapper.aDomain(fila) : null;
  }
}
