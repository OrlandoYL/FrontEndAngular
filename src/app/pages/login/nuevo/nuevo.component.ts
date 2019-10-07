import { MatSnackBar } from '@angular/material';
import { Cliente } from 'src/app/_model/cliente';
import { PasswordValidation } from './match';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.maxFecha = new Date();

    this.form = this.fb.group({
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'fechaNac': new Date(),
      usuario: new FormControl(''),
      password: [''],
      confirmPassword: [''] }, 
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  registrar() {
    let cliente = new Cliente();
    cliente.nombres = this.form.value['nombres'];
    cliente.apellidos = this.form.value['apellidos'];
    cliente.dni = this.form.value['dni'];
    cliente.fechaNac = this.form.value['fechaNac'];

    let usuario = new Usuario();
    usuario.nombre = this.form.value['usuario'];
    usuario.clave = this.form.value['password'];
    usuario.estado = true;
    usuario.cliente = cliente;

    this.usuarioService.registrar(usuario).subscribe(() => {
      this.matSnackBar.open('Se creó usuario', 'INFO', {
        duration: 2000
      });
      
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1500);
    });
  }

}
