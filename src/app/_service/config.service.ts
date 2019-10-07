import { HttpClient } from '@angular/common/http';
import { Config } from './../_model/config';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configCambio = new Subject<Config[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/configuraciones`;    
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/configuraciones`;    
  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Config[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Config>(`${this.url}/${id}`);
  }

  leerParametro(param: string) {
    return this.http.get<Config>(`${this.url}/buscar/${param}`);
  }

  registrar(Config: Config) {
    return this.http.post(this.url, Config);
  }

  modificar(Config: Config) {
    return this.http.put(this.url, Config);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
