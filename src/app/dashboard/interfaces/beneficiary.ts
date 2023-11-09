export interface Beneficiary {
  _id: string;
  nombres: string;
  ci: string;
  expedido: string;
  sexo: string;
  fechaNacimiento: Date;
  carnetFechaOtorgado: Date;
  carnetFechaVencimiento: Date;
  celular: number;
  direccion: string;
  tipoDiscapacidad: string;
  porcentajeDiscapacidad: number;
  estado: boolean;
  habilitado: boolean;
  observacion?: string;
  idApoderado?: string;
  idPago?: string[];
}

