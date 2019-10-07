import { Cliente } from './../_model/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = `${environment.HOST}/clientes`;
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/clientes`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }
  listarPorId(id: number) {
    return this.http.get(`${this.url}/${id}`, {
      responseType: 'blob'
    });
  }
  registrar(cliente: Cliente, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const clienteBlob = new Blob([JSON.stringify(cliente)], { type: "application/json" });
    formdata.append('cliente', clienteBlob);

    return this.http.post(`${this.url}`, formdata, {
      responseType: 'text'
    });
  }
}
