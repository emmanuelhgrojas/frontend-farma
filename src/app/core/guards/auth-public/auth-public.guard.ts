import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../../services/login/authlogin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {
  constructor(
    private router: Router,
    private authLoginService: AuthLoginService,
    ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let listaRutasPublicas: Array<string> = new Array("iniciar-sesion", "recuperar-contrasena", "web", "registrar");
      let basePath = state.url.split('/')[1];
      let isLoggedin = this.authLoginService.getIsLoggedin();
      if(listaRutasPublicas.indexOf(basePath) != -1 && isLoggedin){
        this.router.navigateByUrl("/dashboard");
        return false;
      }
      return true;
  }
  
}
