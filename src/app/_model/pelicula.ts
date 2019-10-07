import { Genero } from './genero';

export class Pelicula {
    idPelicula: number;
    nombre: string;
    resena: string;
    duracion: number;
    fechaPublicacion: string;
    urlPortada: string;
    genero: Genero;
}