import { Genero } from './../_model/genero';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  
  generoCambio = new Subject<Genero[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${environment.HOST}/generos`;
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/generos`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Genero[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`); //&sort=nombre
  }

  listarPorId(id: number) {
    return this.http.get<Genero>(`${this.url}/${id}`);
  }

  registrar(genero: Genero) {
    return this.http.post(this.url, genero);
  }

  modificar(genero: Genero) {
    return this.http.put(this.url, genero);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
