import { Persona } from './persona';

export class Recibo {
  id: string;
  numero: number;
  sueldoNeto: number;
  sueldoBruto: number;
  cuil: string;
  persona: Persona;
}
