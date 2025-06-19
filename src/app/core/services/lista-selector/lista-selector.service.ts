import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametrosSelectorMenu } from '../../interfaces/parametros-selector-menu/parametros-selector-menu-interface';
import { ResponseApi } from '../../interfaces/response-api-interface.';
import { GeneralModel } from '../../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class ListaSelectorService {

  public urlApiPro: string = this.generalModel.urlApi || "";
  public endPointBase: string = "lista-selector/menu";
  

  constructor(
    private _httpClient: HttpClient,
    private generalModel: GeneralModel
  ) { }

  consultarListaSelector(menu: string, parametrosSelectorMenu?: ParametrosSelectorMenu): Observable<ResponseApi> {
    let rutaCompleta = "?nombreLista=" + menu;
    rutaCompleta = this.armarRutaOpcionesMenu(menu, parametrosSelectorMenu);
    return this._httpClient.get<ResponseApi>(this.urlApiPro + this.endPointBase + rutaCompleta);
  }

  armarRutaOpcionesMenu(menu: string, parametrosSelectorMenu?: ParametrosSelectorMenu) {
    let rutaCompleta = "?nombreLista=" + menu;
    if (parametrosSelectorMenu) {
      rutaCompleta = (parametrosSelectorMenu.filtroLike) ? rutaCompleta + "&filtroLike=" + parametrosSelectorMenu.filtroLike : rutaCompleta;
      rutaCompleta = (parametrosSelectorMenu.paisId) ? rutaCompleta + "&paisId=" + parametrosSelectorMenu.paisId : rutaCompleta;
      rutaCompleta = (parametrosSelectorMenu.depaId) ? rutaCompleta + "&depaId=" + parametrosSelectorMenu.depaId : rutaCompleta;
     
    }
    return rutaCompleta;
  }
  
  getTimeZone(){
    return this._httpClient.get<any>('assets/data/time_zone.json');
  }

   getCountries(){
    return this._httpClient.get<any>('assets/data/countries.json');
  }
}
