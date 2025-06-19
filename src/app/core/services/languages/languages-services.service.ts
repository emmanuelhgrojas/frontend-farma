//Import Libraries Interns
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Import Models
import { LanguageViewLoginInterface } from 'src/app/core/interfaces/language/languageViewLogin-interface';
import { ResponseRequestInterface } from 'src/app/core/interfaces/responseRequest-interface';
import { lastValueFrom } from 'rxjs';
import { GeneralModel } from 'src/app/core/models/general.model';



@Injectable({
  providedIn: 'root'
})
export class LanguagesServicesService {
  constructor(
              private _httpClient: HttpClient,
              private generalModel: GeneralModel
            ) { }

  baseUrlGetLanguageForViewLogin = this.generalModel.urlApi + 'language/view/login';
  baseUrlGetLanguageForViewResetPassword = this.generalModel.urlApi + 'language/view/resetPassword';


  async requestGetLanguageForViewLogin(): Promise<ResponseRequestInterface>{
    return await lastValueFrom(this._httpClient.get(this.baseUrlGetLanguageForViewLogin));
  }

  async requestGetLanguageForViewResetPassword(): Promise<ResponseRequestInterface>{
    return await lastValueFrom(this._httpClient.get(this.baseUrlGetLanguageForViewResetPassword));
  }
}
