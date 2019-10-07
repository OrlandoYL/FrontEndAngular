import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/_service/venta.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart: any;
  tipo: string;

  constructor(private ventaService : VentaService) { }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();
  }

  dibujar() {
    this.ventaService.listarResumen().subscribe(data => {      
      //console.log(data);

      let cantidad = data.map(res => res.cantidad);    
      let fechas = data.map(res => res.fecha);
      //console.log(cantidad);
      //console.log(fechas);
      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidad,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  cambiar(tipo: string) {
    this.tipo = tipo;   
    if(this.chart != null){
      this.chart.destroy();
    }
    this.dibujar();
  }
}
