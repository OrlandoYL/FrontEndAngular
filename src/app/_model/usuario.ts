import { Cliente } from './cliente';
export class Usuario {
    idUsuario: number;
    cliente: Cliente;
    nombre: string;
    clave: string;
    estado: boolean;
}