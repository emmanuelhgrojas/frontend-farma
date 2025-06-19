//Import Libraries Interns
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CONSTANTES_APP } from 'src/app/core/constants/constantes-app';
import { END_POINT_API } from 'src/app/core/constants/end-point-api';
import { MENSAJES_APP } from 'src/app/core/constants/mensajes-app';
import { ListaSelector } from 'src/app/core/interfaces/lista-selector/lista-selector-interface';
import { UsuarioInterface } from 'src/app/core/interfaces/usuario/usuario-interface';
import { GeneralModel } from 'src/app/core/models/general.model';
import { LanguageViewLoginModel } from 'src/app/core/models/language/languageViewLogin.model';
import { UsuarioModel } from 'src/app/core/models/usuario/usuario.model';
import { FunctionsGlobalsService } from 'src/app/core/services/functionsGlobals/functionsglobals.service';
import { ListaSelectorService } from 'src/app/core/services/lista-selector/lista-selector.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { ParametrosSelectorMenu } from 'src/app/core/models/parametros-selector-menu/parametros-selector-menu.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('wrapperFormView', {static: false}) wrapperFormView: ElementRef = {} as ElementRef;
  @ViewChild('inputUsername', {static: false}) inputUsername: ElementRef = {} as ElementRef;
  @ViewChild('inputPassword', {static: false}) inputPassword: ElementRef = {} as ElementRef;
  @ViewChild('buttonShowInputPassword', {static: false}) buttonShowInputPassword = {} as ElementRef;
  showMaxLengthCharacterInputUsername: boolean = false;
  showMaxLengthCharacterInputPassword: boolean = false;
  showMaxLengthCharacterInputNombres: boolean = false;
  showMaxLengthCharacterInputApellidos: boolean = false;
  showMaxLengthCharacterInputEmail: boolean = false;
  showMaxLengthCharacterinputNumberDocument: boolean = false;
  showAlertDanger: boolean = false;
  showViewFail: boolean = false;
  lengthCharacterInputUsername: number = 0;
  lengthCharacterInputPassword: number = 0;
  lengthCharacterInputNombres: number = 0;
  lengthCharacterInputApellidos: number = 0;
  lengthCharacterInputEmail: number = 0;
  lengthCharacterInputNumberDocument: number = 0;
  maxLengthCharacterInputUsername: number = 50;
  maxLengthCharacterInputPassword: number = 16;
  minLengthCharacterInputPassword: number = 8;
  maxLengthCharacterInputNombres: number = 150;
  maxLengthCharacterInputApellidos: number = 150;
  maxLengthCharacterInputEmail: number = 200;
  maxLengthCharacterinputNumberDocument: number = 15;
  
  formAuth: UntypedFormGroup = new UntypedFormGroup({});
  responseHttpMessage: string = "";
  languageViewModel: LanguageViewLoginModel = new LanguageViewLoginModel();
  breakpoint: number = 768;
  titleWindowPlatform: string = this.generalModel.titleWindowPlatform || ""; 
  namePlatform : string = this.generalModel.namePlatform || ""; 
  urlApp: string = this.generalModel.urlApp || "";

  public listaTipoIdentificacion: Array<ListaSelector> = [];

  constructor(
      private functionsGlobalsService: FunctionsGlobalsService,
      private formBuilder: UntypedFormBuilder,
      private renderer: Renderer2,
      private elem: ElementRef,
      private generalModel: GeneralModel,
      private usuarioService: UsuarioService,
      private listaSelectorService: ListaSelectorService
    ) {
   }

  async ngOnInit() {
    this.inicializarForm(); 
    
    const indicatorsCarousel = this.elem.nativeElement.querySelectorAll('.carousel-indicators');
    indicatorsCarousel.forEach((indicator: any) => {
      this.renderer.setStyle(indicator, 'bottom', '60px');
      this.renderer.setStyle(indicator, 'right', '60%');
    });
    if (screen.width <= this.breakpoint) {
      this.renderer.setStyle(this.wrapperFormView.nativeElement, "width", screen.width -  15 + "px");
    }    
    this.consultarListaSelector(END_POINT_API.END_POINT_API_TIPO_IDENTIFICACION, new ParametrosSelectorMenu(), () => {}, true, true);    
  }

  inicializarForm(){
    this.formAuth = this.formBuilder.group({
      inputEmail: ['', Validators.compose([Validators.required, Validators.email])],
      inputNombres: ['', Validators.compose([Validators.required])],
      inputApellidos: ['', Validators.compose([Validators.required])],
      inputUsername: [''],
      inputTypeDocument: [CONSTANTES_APP.TIPO_IDENTIFICACION_CEDULA, Validators.compose([Validators.required])],
      inputNumberDocument: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(999999999999999), Validators.pattern(/^([0-9.])*$/)])],
      inputPassword: ['', Validators.compose([Validators.required])]
    });
    //this.formGroupControls["inputTypeDocument"]?.disable();
  }

  ngAfterViewInit() {

  }

  get formGroupControls() {
    return this.formAuth.controls;
  }

  focusInputInputPassword(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputPassword = legthCharacter;
    }
    this.showMaxLengthCharacterInputPassword = true;
  }

  focusOutInputInputPassword(): void {
    this.showMaxLengthCharacterInputPassword = false;
  }

  focusInputUsername(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputUsername = legthCharacter;
    }
    this.showMaxLengthCharacterInputUsername = true;
  }

  focusOutInputUsername(): void {
    this.showMaxLengthCharacterInputUsername = false;
  }

  focusInputNumberDocument(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputNumberDocument = legthCharacter;
    }
    this.showMaxLengthCharacterinputNumberDocument = true;
  }

  focusOutInputNumberDocument(): void {
    this.showMaxLengthCharacterinputNumberDocument = false;
  }

  focusInputNombres(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputNombres = legthCharacter;
    }
    this.showMaxLengthCharacterInputNombres = true;
  }

  focusOutInputNombres(): void {
    this.showMaxLengthCharacterInputNombres = false;
  }

  focusInputApellidos(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputApellidos = legthCharacter;
    }
    this.showMaxLengthCharacterInputApellidos = true;
  }

  focusOutInputApellidos(): void {
    this.showMaxLengthCharacterInputApellidos = false;
  }

  focusInputEmail(event: any): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      this.lengthCharacterInputEmail = legthCharacter;
    }
    this.showMaxLengthCharacterInputEmail = true;
  }

  focusOutInputEmail(): void {
    this.showMaxLengthCharacterInputEmail = false;
  }

  showInputPassword(input: any): void {
    if(this.buttonShowInputPassword.nativeElement.classList.contains('glyphicon-eye-open')){
      input.type = "text";
      this.renderer.removeClass(this.buttonShowInputPassword.nativeElement, "glyphicon-eye-open");
      this.renderer.addClass(this.buttonShowInputPassword.nativeElement, "glyphicon-eye-close");
    }else{
      input.type = "password";
      this.renderer.removeClass(this.buttonShowInputPassword.nativeElement, "glyphicon-eye-close");
      this.renderer.addClass(this.buttonShowInputPassword.nativeElement, "glyphicon-eye-open");
    }
  }

  validateMaxLengthCharacter(event: any, legthCharacters: number): void {
    if(event){
      let legthCharacter = (event.target.value).length;
      let textInput = event.target.value;
      let newTextInput = null;

      if(legthCharacter > legthCharacters){
        newTextInput = textInput.slice(0, legthCharacters);
        event.target.value = newTextInput;
      }
      if(event.target.name == "inputPassword"){
        this.lengthCharacterInputPassword = legthCharacter;
      }
      if(event.target.name == "inputUsername"){
        this.lengthCharacterInputUsername = legthCharacter;
        event.target.value = (event.target.value) ? (event.target.value).toLowerCase() : '';
      }
      if(event.target.name == "inputNumberDocument"){
        this.lengthCharacterInputNumberDocument = legthCharacter;
      }
      if(event.target.name == "inputNombres"){
        this.lengthCharacterInputNombres = legthCharacter;        
      }
      if(event.target.name == "inputApellidos"){
        this.lengthCharacterInputApellidos = legthCharacter;        
      }
      if(event.target.name == "inputEmail"){
        this.lengthCharacterInputEmail = legthCharacter;
        event.target.value = (event.target.value) ? (event.target.value).toLowerCase() : '';
      }
    }
  }

  authUser(formRegistrar: UntypedFormGroup): void{
    this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
    let usuarioInterface: UsuarioInterface = new UsuarioModel();
    usuarioInterface.usuaEmail = formRegistrar.value.inputEmail;
    usuarioInterface.usuaPassword = formRegistrar.value.inputPassword;
    usuarioInterface.usuaUsername = formRegistrar.value.inputUsername;
    usuarioInterface.usuaNombres = formRegistrar.value.inputNombres;
    usuarioInterface.usuaApellidos = formRegistrar.value.inputApellidos;
    usuarioInterface.usuaNumeroIdentificacion = formRegistrar.value.inputNumberDocument;
    usuarioInterface.usuaTipoIdentificacion = formRegistrar.value.inputTypeDocument;    
    this.usuarioService.registrarUsuario(usuarioInterface).subscribe({ next: (responseRequest) => {
      this.functionsGlobalsService.closeAlertRequest(); 
      this.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlertaExitoso || "", responseRequest.message || "", responseRequest.status, () => {});
      if(responseRequest.status == 200){
        formRegistrar.reset();
        this.formGroupControls["inputTypeDocument"]?.setValue(CONSTANTES_APP.TIPO_IDENTIFICACION_CEDULA);
        this.showAlertDanger = false;
      }else{
        this.functionsGlobalsService.closeAlertRequest();
        this.showAlertDanger = true;
        this.responseHttpMessage = responseRequest.message || "";
      }
    }, error: (responseRequestError) => { 
      this.functionsGlobalsService.closeAlertRequest();
      if(responseRequestError){
        
      }          
      this.showViewFail = true;
    }, complete: () => { 
      //this.functionsGlobalsService.closeAlertRequest();
    } 
  }); 

  }

  onResize(event: any) {
    const widthView = event.target.innerWidth;
    if (widthView <= this.breakpoint) {
      this.renderer.setStyle(this.wrapperFormView.nativeElement, "width", widthView -  15 + "px");
    } else {
      this.renderer.setStyle(this.wrapperFormView.nativeElement, "width", (widthView - (widthView - 485)) + "px");
    }
  }

  showViewForm(event: any): void{
    event.preventDefault();
    this.formAuth.reset();
    this.showViewFail = false;    
  }

  consultarListaSelector(menu:string, parametrosSelectorMenu: ParametrosSelectorMenu, callback: any, openLoading: boolean, closeLoading: boolean) {
    if(openLoading){
      this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
    }    
    this.listaSelectorService.consultarListaSelector(menu, parametrosSelectorMenu).subscribe({ next: (responseRequest) => { 
        responseRequest.result = (Array.isArray(responseRequest.result) && responseRequest.result.length > 0) ? responseRequest.result : [];
        responseRequest.result.unshift({"label": "Seleccione", "value": ""});
        switch (menu) {
          case END_POINT_API.END_POINT_API_TIPO_IDENTIFICACION:
              this.listaTipoIdentificacion = responseRequest.result.filter((tpIdentificacion: any) => tpIdentificacion.value != CONSTANTES_APP.TIPO_IDENTIFICACION_NIT);
              break;
        }            
        if(callback) callback();
      }, error: (responseRequestError) => { 
        this.functionsGlobalsService.closeAlertRequest();
        if(responseRequestError){        
          this.functionsGlobalsService.showMessageErrorAlert("consultarListaSelector()", "consultarListaSelector()", responseRequestError);
        }                
      }, complete: () => { 
        if(closeLoading){
          this.functionsGlobalsService.closeAlertRequest();
        }      
      } 
    });
  }
}