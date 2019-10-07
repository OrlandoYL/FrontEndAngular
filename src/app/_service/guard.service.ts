import { Menu } from './../_model/menu';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/_service/login.service.js';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MenuService } from './menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService, private menuService: MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //logica que devuelva true or false   
    const helper = new JwtHelperService();

    let rpta = this.loginService.estaLogeado();

    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      //esta logueado
      let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));

      if (!helper.isTokenExpired(token.access_token)) {
        //no expirado y toca verificar roles
        const decodedToken = helper.decodeToken(token.access_token);

        let url = state.url; // /pelicula

        return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
          this.menuService.menuCambio.next(data);

          let cont = 0;
          for (let menuBD of data) {
            if (url.startsWith(menuBD.url)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
        }));

      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }

    }
  }
}
