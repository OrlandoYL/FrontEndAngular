import { FiltroConsultaDTO } from './../_model/filtroConsultaDTO';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../_model/venta';
import { VentaDTO } from '../_model/ventaDTO';
import { ResumenVentaDTO } from '../_model/resumenVentaDTO';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  
  url: string = `${environment.HOST}/ventas`;    
  //url: string = `${environment.HOST}/${environment.MICRO_CR}/ventas`;  
  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Venta[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Venta>(`${this.url}/${id}`);
  }

  registrar(venta: VentaDTO) {
    return this.http.post(this.url, venta);
  }

  generarReporte(ventaDTO : VentaDTO){
    return this.http.post(`${this.url}/generarReporte`, ventaDTO, {
      responseType: 'blob'
    });
  }  

  buscar(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Venta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  listarComidasPorVenta(idVenta: number){
    return this.http.get<VentaDTO[]>(`${this.url}/buscar/comidas/${idVenta}`);
  }

  listarResumen() {
    return this.http.get<ResumenVentaDTO[]>(`${this.url}/listarResumen`);
  }

  
}
