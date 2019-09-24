import { EstadoTerreno } from './estado-terreno';

export class Terreno {
  id: string;
  numero: number;
  largo: number;
  frente: number;
  direccion: string;
  valor: number;
  matricula: string;
  estado: EstadoTerreno;
}
