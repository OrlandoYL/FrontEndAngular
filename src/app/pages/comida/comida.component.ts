import { ComidaDialogoComponent } from './comida-dialogo/comida-dialogo.component';
import { ComidaService } from './../../_service/comida.service';
import { Comida } from './../../_model/comida';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Comida>;
  displayedColumns = ['idComida', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private comidaService: ComidaService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.comidaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.comidaService.comidaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.comidaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(genero?: Comida) {
    let gen = genero != null ? genero : new Comida();
    this.dialog.open(ComidaDialogoComponent, {
      width: '250px',
      data: gen
    });
  }

  eliminar(genero: Comida) {
    this.comidaService.eliminar(genero.idComida).subscribe(data => {
      this.comidaService.listar().subscribe(medicos => {
        this.comidaService.comidaCambio.next(medicos);
        this.comidaService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
