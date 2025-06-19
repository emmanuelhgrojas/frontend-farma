import { JwtDto } from './../models/jwt-dto';
import { LoginUsuario } from './../models/login-usuario';
import { Observable } from 'rxjs/internal/Observable';
import { NuevoUsuario } from './../models/nuevo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<any>(this.authURL + 'login', loginUsuario);
  }
}
