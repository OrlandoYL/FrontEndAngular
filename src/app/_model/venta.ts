import { DetalleVenta } from './detalleVenta';
import { Cliente } from './cliente';
import { Pelicula } from './pelicula';
export class Venta{
    idVenta: number;
    fecha: string;
    cliente: Cliente;
    pelicula: Pelicula;
    cantidad: number;
    total: number;
    detalle: DetalleVenta[];
}