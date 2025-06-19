import { Injectable } from '@angular/core';

const TOKEN_kEY = 'accessToken';
const USERNAME_KEY = 'usernameCurrent';
const AUTHORITIES_kEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void{
    window.localStorage.removeItem(TOKEN_kEY);
    window.localStorage.setItem(TOKEN_kEY, token);
  }

  public getToken(){
    return localStorage.getItem(TOKEN_kEY);
  }

  public setUserName(userName: string): void{
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(){
    return localStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void{
    window.localStorage.removeItem(AUTHORITIES_kEY);
    window.localStorage.setItem(AUTHORITIES_kEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[]{
    this.roles = [];
    const item = window.localStorage.getItem(AUTHORITIES_kEY)!;
    if(localStorage.getItem(AUTHORITIES_kEY)){
      JSON.parse(item).foreach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);        
      });
    }
    return this.roles;
  }

  public logOut(): void{
    window.localStorage.clear();
  }


}
