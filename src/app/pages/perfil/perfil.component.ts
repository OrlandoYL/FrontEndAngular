import { Component, OnInit } from '@angular/core';
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
  cliente: number;
  mensaje: string = "";
  imagenData: any;
  imagenDataAvatar: any;
  imagenEstado: boolean = false;
  constructor(
    private sanitization: DomSanitizer,
    private clienteService: ClienteService) { }

  ngOnInit() {
    this.obtToken();
  }
  obtToken() {
    const helper = new JwtHelperService();
    //DECODIFICAR TOKEN
    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);
    this.usuario = decodedToken.user_name;
    this.clienteService.leerIdUsuario(this.usuario).subscribe(datax => {

      //this.cliente = datax.cliente.idCliente;
      this.clienteService.listarPorId(datax.cliente.idCliente).subscribe(datai => {
        //console.log(datai);
        if (datai.size > 0) {
          this.convertir(datai);
        }
      });
    });

    this.roles = decodedToken.authorities;
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
    this.imagenDataAvatar = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imagenEstado = true;
  }

}
