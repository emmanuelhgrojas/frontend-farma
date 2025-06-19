import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralModel } from '../../models/general.model';
import { Observable } from 'rxjs';
import { WeatherInterface } from '../../interfaces/weather/weather-interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public urlApiPro: string = this.generalModel.urlApi || "";
  public urlApiWeather: string = this.generalModel.urlApiWeather || "";
  public endPointBaseApiWeather: string = this.urlApiWeather + "current.json";
  public keyApiWeather: string = this.generalModel.keyApiWeather || "";

  constructor(
    private _httpClient: HttpClient,
    private generalModel: GeneralModel) { }

    getCurrentWeather(country: string): Observable<WeatherInterface> {
      return this._httpClient.get<WeatherInterface>(this.endPointBaseApiWeather + '?key=' + this.keyApiWeather + "&q=" + country + "&aqi=yes");
    }
}
  