import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MENSAJES_APP } from '../../constants/mensajes-app';
import { FunctionsGlobalsService } from '../../services/functionsGlobals/functionsglobals.service';
import { AuthLoginService } from '../../services/login/authlogin.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  public permisosGlobales: any;
  public isActive = false;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authLoginService: AuthLoginService,
    private functionsGlobalsService: FunctionsGlobalsService,
    ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
      let accessToken = this.authLoginService.getToken();
      let username = this.authLoginService.getUsernameCurrent();
      let listaPermisosUsuario: Array<string> = new Array("/dashboard");
      //this.isActive = this.isBasePathAllowed(state.url, listaPermisosUsuario);
      if(!username || !accessToken){
        this.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlerta || "", MENSAJES_APP.usuarioNoTienePermisos || "", 401, () => {
          this.router.navigateByUrl("/dashboard");
          return false;
        });    
      }
      this.functionsGlobalsService.closeAlertRequest();
      return true;    
  }
}
