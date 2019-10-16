import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Rol } from 'src/app/_model/rol';
import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: string;
  roles: Rol[];
  mensaje: string = "";
  imagenData: any;
  labelFile: string;
  imagenEstado: boolean = false;
  constructor(
    private loginService: LoginService,private sanitization: DomSanitizer, private clienteService: ClienteService) { }

  ngOnInit() {
    this.obtToken();

    //this.clienteService.listarPorId(this.data.idCliente).subscribe(data => {
      //console.log(data);
    //  if (data.size > 0) {
    //    this.convertir(data);
     // }
    //});
  }
  obtToken() {
    const helper = new JwtHelperService();
     //DECODIFICAR TOKEN
     let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
     const decodedToken = helper.decodeToken(tk.access_token);
     this.usuario = decodedToken.user_name;
     //let roles = new Rol();
     console.log(decodedToken);
     this.roles = decodedToken.authorities;
     //roles.rol 
     //return false;
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      //console.log(base64);
      //this.imagenData = base64;
      this.setear(base64);
    }
  }

  setear(x: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imagenEstado = true;
  }

}
