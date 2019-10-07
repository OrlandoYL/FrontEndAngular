import { PeliculaService } from './../../../_service/pelicula.service';
import { GeneroService } from './../../../_service/genero.service';
import { Genero } from './../../../_model/genero';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/_model/pelicula';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-edicion',
  templateUrl: './pelicula-edicion.component.html',
  styleUrls: ['./pelicula-edicion.component.css']
})
export class PeliculaEdicionComponent implements OnInit {

  pelicula: Pelicula;
  id: number;
  edicion: boolean;
  form: FormGroup;
  generos: Genero[];
  idGeneroSeleccionado: number;
  urlImagen: string;
  
  constructor(private generoService : GeneroService,
    private peliculaService : PeliculaService,
    private route : ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idPelicula': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'resena': new FormControl('', Validators.required),
      'duracion': new FormControl(0, Validators.minLength(2)),
      'fechaPublicacion': new FormControl(new Date()),
      'urlPortada': new FormControl('', Validators.required),
      'genero': new FormControl('', Validators.required)
    });

    this.pelicula = new Pelicula();
    this.listarGeneros();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
    
  }
  //https://angular.io/guide/form-validation
  get f() { return this.form.controls; }

  initForm() {

    if (this.edicion) {
      //cargar la data del servicio hacia el form 
      this.peliculaService.listarPorId(this.id).subscribe(data => {

        this.form = new FormGroup({
          'idPelicula': new FormControl(data.idPelicula),
          'nombre': new FormControl(data.nombre),
          'resena': new FormControl(data.resena),
          'duracion': new FormControl(data.duracion),
          'fechaPublicacion': new FormControl(new Date(data.fechaPublicacion)),
          'urlPortada': new FormControl(data.urlPortada),
          'genero': new FormControl(data.genero)
        });

        this.urlImagen = this.form.value['urlPortada'];
        this.idGeneroSeleccionado = data.genero.idGenero;
      });
    }
  }

  operar() {

    if (this.form.invalid) {
      return;
    }

    let pelicula = new Pelicula();
    pelicula.idPelicula = this.form.value['idPelicula'];
    pelicula.urlPortada = this.form.value['urlPortada'];
    pelicula.resena = this.form.value['resena'];
    pelicula.nombre = this.form.value['nombre'];
    pelicula.duracion = this.form.value['duracion'];    

    let genero = new Genero();
    genero.idGenero = this.idGeneroSeleccionado;
    pelicula.genero = genero;
    /*var tzoffset = (this.form.value['fechaPublicacion']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()*/
    pelicula.fechaPublicacion = moment(this.form.value['fechaPublicacion']).format('YYYY-MM-DDTHH:mm:ss');//localISOTime;

    if (pelicula.idPelicula > 0) {
      
      //Buena práctica
      this.peliculaService.modificar(pelicula).pipe(switchMap(() => {
        return this.peliculaService.listar();
      })).subscribe(data => {
        this.peliculaService.peliculaCambio.next(data);
        this.peliculaService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //Práctica común
      this.peliculaService.registrar(pelicula).subscribe(() => {
        this.peliculaService.listar().subscribe(data => {
          this.peliculaService.peliculaCambio.next(data);
          this.peliculaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['pelicula']);
  }

  listarGeneros(){
    this.generoService.listar().subscribe(data => {
      this.generos = data;
    });
  }
}
