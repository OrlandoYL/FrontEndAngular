import { PeliculaService } from './../../_service/pelicula.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pelicula } from 'src/app/_model/pelicula';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  dataSource: MatTableDataSource<Pelicula>;
  displayedColumns = ['idPelicula', 'nombre', 'genero', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private peliculaService: PeliculaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.peliculaService.peliculaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.peliculaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.peliculaService.listar().subscribe(data => {
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

  eliminar(idPelicula: number) {
    this.peliculaService.eliminar(idPelicula).subscribe(data => {
      this.peliculaService.listar().subscribe(data => {
        this.peliculaService.peliculaCambio.next(data);
        this.peliculaService.mensajeCambio.next('Se eliminó');
      });
    });
  }

}
