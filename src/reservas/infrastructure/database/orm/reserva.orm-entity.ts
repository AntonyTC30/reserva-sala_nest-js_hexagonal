import { Column, PrimaryColumn, Entity, Index } from 'typeorm';

@Entity({ name: 'reservas' })
@Index('idx_reservas_sala', ['salaId'])
export class ReservaOrmEntity {
  @PrimaryColumn({ name: 'id', type: 'text' })
  id: string;

  @Column({ name: 'sala_id', type: 'text' })
  salaId: string;

  @Column({ name: 'solicitante', type: 'text' })
  solicitante: string;

  @Column({ name: 'fecha_inicio', type: 'datetime' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'datetime' })
  fechaFin: Date;
}
