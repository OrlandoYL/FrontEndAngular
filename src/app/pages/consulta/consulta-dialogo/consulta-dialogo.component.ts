import { VentaService } from './../../../_service/venta.service';
import { VentaDTO } from './../../../_model/ventaDTO';
import { Venta } from './../../../_model/venta';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-consulta-dialogo',
  templateUrl: './consulta-dialogo.component.html',
  styleUrls: ['./consulta-dialogo.component.css']
})
export class ConsultaDialogoComponent implements OnInit {

  venta: Venta;
  comidas: VentaDTO[];

  constructor(public dialogRef: MatDialogRef<ConsultaDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Venta, private ventaService: VentaService ) { }

  ngOnInit() {
    this.venta = this.data;
    this.listarComidas();
  }

  listarComidas() {
    this.ventaService.listarComidasPorVenta(this.venta.idVenta).subscribe((data) => {
      this.comidas = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
