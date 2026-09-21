export class Reserva {
  constructor(
    public id: string,
    public salaId: string,
    public solictante: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public duracionMinutos: number,
  ) {}

  public static create(
    id: string,
    salaId: string,
    solictante: string,
    fechaInicio: Date,  
    fechaFin: Date,
    duracionMinutos: number,
  ): Reserva {
    return new Reserva(id, salaId, solictante, fechaInicio, fechaFin, duracionMinutos);
  }
}
