import { Component, OnInit } from '@angular/core';
import { END_POINT_API } from 'src/app/core/constants/end-point-api';
import { ResponseApi } from 'src/app/core/interfaces/response-api-interface.';
import { WeatherInterface } from 'src/app/core/interfaces/weather/weather-interface';
import { GeneralModel } from 'src/app/core/models/general.model';
import { ParametrosSelectorMenu } from 'src/app/core/models/parametros-selector-menu/parametros-selector-menu.model';
import { FunctionsGlobalsService } from 'src/app/core/services/functionsGlobals/functionsglobals.service';
import { ListaSelectorService } from 'src/app/core/services/lista-selector/lista-selector.service';
import { WeatherService } from 'src/app/core/services/weather/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  labelPais: string = "N/A";
  labelCapital: string = "N/A";
  labelRegion: string = "N/A";
  labelLatitud: number = 0;
  labelLontigud: number = 0;
  pathImgCondition: string = "http://cdn.weatherapi.com/weather/64x64/night/116.png";
  labelCondition: string = "Partly cloudy";
  labelConditionC: number = 24;
  labelHora: string = "";
  labelTimeZone: string = "N/A";
  listaTareas: any;
  listTimeZone: any;
  listCountries: any;
  listTimeZonesByCountry: any;
  countrySelected: string = "Colombia";
  timeZoneSelected: any;
  private intervalId: any;

  public urlApp: string = this.generalModel.urlApp || "";

  constructor(
    private listaSelectorService: ListaSelectorService,
    private functionsGlobalsService: FunctionsGlobalsService, 
    private weatherService: WeatherService,
  private generalModel: GeneralModel) { }

  ngOnInit(): void {    
    this.loadActivities();
    this.getTimeZone();
    this.getCountries();
    this.intervalId = setInterval(() => {
      this.loadTimeZoneByCountry(this.timeZoneSelected);
    }, 1000);
  }

  loadCountryByClick(country:any){
     Swal.fire({
          title: '¿Desea cargar la información de ' + country,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.countrySelected = country;
        this.loadCountry(country, true);
      } 
    })
  }

  loadCountry(country:string, openLoader: boolean){
    if(openLoader)
    this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");

    this.weatherService.getCurrentWeather(country).subscribe({
      next:(response: WeatherInterface) => {
        this.functionsGlobalsService.closeAlertRequest();     
        this.labelPais = response.location.country;
        this.labelCapital = response.location.name;
        this.labelRegion = response.location.region;
        this.labelLatitud = response.location.lat;            
        this.labelLontigud = response.location.lon;
        this.pathImgCondition = response.current.condition.icon;
        this.labelCondition = response.current.condition.text;
        this.labelConditionC = response.current.dewpoint_c;
        this.labelHora = response.location.localtime;
        this.labelTimeZone = response.location.tz_id;     
        this.searchTimeZoneByCountry(this.countrySelected);     
      }, error: (responseError: any) => {
        this.functionsGlobalsService.closeAlertRequest();
          if(responseError){        
            this.functionsGlobalsService.showMessageErrorAlert("ngOnInit()", "loadCountry()", responseError);
        }   
      }, complete: () => { 
        //this.functionsGlobalsService.closeAlertRequest();     
      }
    });
  }

  loadActivities(){
    this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
    this.listaSelectorService.consultarListaSelector(END_POINT_API.END_POINT_API_TAREAS, new ParametrosSelectorMenu()).subscribe({
      next:(response: ResponseApi) => {
        this.listaTareas = response.result;
        this.loadCountry(this.countrySelected, false);        
      }, error: (responseError: any) => {
        this.functionsGlobalsService.closeAlertRequest();
          if(responseError){        
            this.functionsGlobalsService.showMessageErrorAlert("ngOnInit()", "loadActivities()", responseError);
        }   
      }, complete: () => { 
        //this.functionsGlobalsService.closeAlertRequest();     
      }
    });
  }

  getTimeZone(){
    this.listaSelectorService.getTimeZone().subscribe({
      next:(response: any) => {
        this.listTimeZone = response?.data;
      }, error: (responseError: any) => {
        this.functionsGlobalsService.closeAlertRequest();
          if(responseError){        
            this.functionsGlobalsService.showMessageErrorAlert("ngOnInit()", "getTimeZone()", responseError);
        }   
      }, complete: () => { 
        //this.functionsGlobalsService.closeAlertRequest();     
      }
    });
  }

  getCountries(){
    this.listaSelectorService.getCountries().subscribe({
      next:(response: any) => {
        this.listCountries = response?.data;
        this.searchTimeZoneByCountry(this.countrySelected);
      }, error: (responseError: any) => {
        this.functionsGlobalsService.closeAlertRequest();
          if(responseError){        
            this.functionsGlobalsService.showMessageErrorAlert("ngOnInit()", "getCountries()", responseError);
        }   
      }, complete: () => { 
        //this.functionsGlobalsService.closeAlertRequest();     
      }
    });
  }

  searchTimeZoneByCountry(countryString: string){
    this.listTimeZonesByCountry = [];
    let prefixCountry= "";
    for(let country of this.listCountries){
      if(country.value == countryString){
        prefixCountry = country.key;
      }
    }
    if(prefixCountry){
      for(let timeZone of this.listTimeZone){
        if(timeZone.key == prefixCountry){
          this.listTimeZonesByCountry.push(timeZone);
        }
      }
    }
    if(this.listTimeZonesByCountry.length > 0){
      this.loadTimeZoneByCountry(this.listTimeZonesByCountry[0]);
    }
  }

  loadTimeZoneByCountry(timeZone: any){
    this.timeZoneSelected = timeZone;
    this.labelHora = this.functionsGlobalsService.getFormattedDateTimeWithAmPm(this.timeZoneSelected.utc_time) || "";
    this.labelTimeZone = this.timeZoneSelected.value;
  }
}
