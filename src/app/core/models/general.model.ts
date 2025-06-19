import { Injectable } from '@angular/core';
//Import Enviroment
import { environment } from 'src/environments/environment';


@Injectable()
export class GeneralModel {
    titleWindowPlatform?: string;
    namePlatform ?: string;
    urlApi ?: string;
    urlWebSocket?: string;
    urlApp?: string;
    urlApiWeather?: string;
    keyApiWeather?: string;

    constructor() {
        this.titleWindowPlatform = environment.titleWindowPlatform;
        this.namePlatform = environment.namePlatform;
        this.urlApi = environment.urlApi;
        this.urlWebSocket = environment.urlWebSocket;
        this.urlApp = environment.urlApp;
        this.urlApiWeather = environment.urlApiWeather;
        this.keyApiWeather = environment.keyApiWeather;
    }

}
