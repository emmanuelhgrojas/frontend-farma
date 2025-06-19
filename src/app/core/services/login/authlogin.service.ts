//Import Libraries Interns
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

//Import Interfaces
import { ResponseRequestInterface } from 'src/app/core/interfaces/responseRequest-interface';
import { AccessTokenUserInterface } from 'src/app/core/interfaces/login/accessTokenUser-interface';
import { LoginAuthInterface } from 'src/app/core/interfaces/login/loginAuth-interface';
//Import Models
import { GeneralModel } from 'src/app/core/models/general.model';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.getToken()
  });


  baseUrlPostAuthLoginUser = this.generalModel.urlApi + 'auth/iniciar-sesion';
  baseUrlPostAuthResetPasswordUser = this.generalModel.urlApi + 'auth/resetPassword';
  baseUrlPostAuthSignOffUser = this.generalModel.urlApi + 'auth/signOff';


  constructor(
    public jwtHelper: JwtHelperService,
    private _httpClient: HttpClient,
    private generalModel: GeneralModel
  ) { }


  authLoginUser(formAuthLogin: LoginAuthInterface): Observable<ResponseRequestInterface> {
    return this._httpClient.post<ResponseRequestInterface>(this.baseUrlPostAuthLoginUser, formAuthLogin, {});
  }

  authResetPasswordUser(formAuthResetPassword: LoginAuthInterface): Observable<ResponseRequestInterface> {
    return this._httpClient.post<ResponseRequestInterface>(this.baseUrlPostAuthResetPasswordUser, formAuthResetPassword, {});
  }

  authSignOffUser() {
    let accessToken = "Bearer " + localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usernameCurrent");
    return this._httpClient.post<ResponseRequestInterface>(this.baseUrlPostAuthSignOffUser, {}, { headers: { "Content-Type": "application/json", "Authorization": accessToken } });
  }

  getHeadersRequest(): HttpHeaders {
    return this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.getToken()
    });
  }

  setUsername(username: string): void {
    let usernameString = JSON.stringify(username);
    localStorage.setItem("usernameCurrent", usernameString);
  }

  getUsernameCurrent(): string {
    let usernameString = localStorage.getItem("usernameCurrent");
    if (usernameString) {
      let username = JSON.parse(usernameString);
      return username;
    }
    return "";
  }

  setToken(accessToken: string): void {
    localStorage.setItem("accessToken", accessToken);
  }

  getToken(): string {
    let accessToken: string = localStorage.getItem("accessToken") || "";
    return accessToken;
  }

  public isUserAuthenticated(accessToken: string): boolean {
    accessToken = (accessToken) ? accessToken : localStorage.getItem('accessToken') || "";
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  public getDecodeAccessToken(accessToken: string): AccessTokenUserInterface {
    return jwtHelper.decodeToken(accessToken);
  }

  getIsLoggedin(): string {
    let isLoggedin: string = localStorage.getItem("isLoggedin") || "";
    return isLoggedin;
  }

  setIsLoggedin(isLoggedin: string): void {
    localStorage.setItem("isLoggedin", isLoggedin);
  }

  getEmail(): string {
    let usuaEmail: string = localStorage.getItem("usuaEmail") || "";
    return usuaEmail;
  }

  setEmail(email: string): void {
    localStorage.setItem("usuaEmail", email);
  }
  

  setRolUser(rolUser: string): void {
    localStorage.setItem("rolUser", rolUser);
  }

  getRolUser(): string {
    let rolUser: string = localStorage.getItem("rolUser") || "";
    return rolUser;
  }

  setRolIdUser(rolIdUser: string): void {
    localStorage.setItem("rolIdUser", rolIdUser);
  }

  getRolIdUser(): string {
    let rolIdUser: string = localStorage.getItem("rolIdUser") || "";
    return rolIdUser;
  }
}
