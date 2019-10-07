import { Menu } from './_model/menu';
import { MenuService } from 'src/app/_service/menu.service';
import { LoginService } from './_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  menus: Menu[] = [];

  constructor(public loginService : LoginService, private menuService : MenuService){

  }

  ngOnInit(){
    this.menuService.menuCambio.subscribe(data => {
      this.menus = data;
    });
  }

  /*cerrarSesion(){
    this.loginService.cerrarSesion();
  }*/
}
