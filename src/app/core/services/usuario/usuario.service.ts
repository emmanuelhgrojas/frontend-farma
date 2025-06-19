import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api-interface.';
import { UsuarioInterface } from '../../interfaces/usuario/usuario-interface';
import { GeneralModel } from '../../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public urlApiPro: string = this.generalModel.urlApi || "";
  public endPointBase: string = "usuario";
  public endPointConsultarPermisosUsuario: string = this.endPointBase + "/permisos/";
  public endPointGuardarUsuario: string = this.endPointBase + "/guardar";
  public endPointRegistrarUsuario: string = this.endPointBase + "/registrar";

  constructor(private _httpClient: HttpClient, private generalModel: GeneralModel) { }

  async asyncConsultarPermisosUsuario(username: string): Promise<ResponseApi> {
    return await lastValueFrom(this._httpClient.get<ResponseApi>(this.urlApiPro + this.endPointConsultarPermisosUsuario + username));
  }

  consultarPermisosUsuario(username: string) {
    return this._httpClient.get(this.urlApiPro + this.endPointConsultarPermisosUsuario + username);
  }

  consultarUsuarioPorId(usuarioId: string): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(this.urlApiPro + this.endPointBase + "/" + usuarioId);
  }

  eliminarUsuarioPorId(usuarioId: string): Observable<ResponseApi> {
    return this._httpClient.delete<ResponseApi>(this.urlApiPro + this.endPointBase + "/" + usuarioId);
  }

  guardarUsuario(usuario: UsuarioInterface): Observable<ResponseApi> {
    return this._httpClient.post<ResponseApi>(this.urlApiPro + this.endPointGuardarUsuario, usuario);
  }

  registrarUsuario(usuario: UsuarioInterface): Observable<ResponseApi> {
    return this._httpClient.post<ResponseApi>(this.urlApiPro + this.endPointRegistrarUsuario, usuario);
  }
}
