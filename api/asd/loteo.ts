import { Terreno } from './terreno';
import { Duenio } from './duenio';

export class Loteo {
  id: string;
  numero: number;
  ubicacion: string;
  nombre: string;
  terrenosDisponibles: number;
  terrenos: [Terreno];
  duenios: [Duenio];
}
