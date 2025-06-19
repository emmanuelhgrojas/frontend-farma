//Import Libraries Interns
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Import Models
import { LanguageViewLoginModel } from 'src/app/core/models/language/languageViewLogin.model';

//Import Services
import { LanguagesServicesService } from 'src/app/core/services/languages/languages-services.service';
import { FunctionsGlobalsService } from 'src/app/core/services/functionsGlobals/functionsglobals.service';
import { AuthLoginService } from 'src/app/core/services/login/authlogin.service';
import { LoginAuthInterface } from '../../core/interfaces/login/loginAuth-interface';
import { GeneralModel } from 'src/app/core/models/general.model';
//import { WebSocketService } from 'src/app/services/webSocket/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class LoginComponent implements OnInit {
  @ViewChild('wrapperFormViewLogin', {static: false}) wrapperFormViewLogin: ElementRef = {} as ElementRef;
  @ViewChild('inputUsername', {static: false}) inputUsername: ElementRef = {} as ElementRef;
  @ViewChild('inputPassword', {static: false}) inputPassword: ElementRef = {} as ElementRef;
  @ViewChild('buttonShowInputPassword', {static: false}) buttonShowInputPassword = {} as ElementRef;
  showMaxLengthCharacterInputUsername: boolean = false;
  showMaxLengthCharacterInputPassword: boolean = false;
  showAlertDanger: boolean = false;
  showViewLoginFail: boolean = false;
  lengthCharacterInputUsername: number = 0;
  lengthCharacterInputPassword: number = 0;
  maxLengthCharacterInputUsername: number = 50;
  maxLengthCharacterInputPassword: number = 16;
  minLengthCharacterInputPassword: number = 8;
  formAuthLogin: UntypedFormGroup = new UntypedFormGroup({});
  responseHttpMessage: string = "";
  languageViewLoginModel: LanguageViewLoginModel = new LanguageViewLoginModel();
  breakpoint: number = 768;
  titleWindowPlatform: string = this.generalModel.titleWindowPlatform || ""; 
  namePlatform : string = this.generalModel.namePlatform || ""; 
  urlApp: string = this.generalModel.urlApp || "";

  constructor(
      private authLoginService: AuthLoginService,
      private functionsGlobalsService: FunctionsGlobalsService,
      private languagesServicesService : LanguagesServicesService,
      private formBuilder: UntypedFormBuilder,
      private renderer: Renderer2,
      private elem: ElementRef,
      private router: Router,
      private generalModel: GeneralModel
    ) {
   }

  async ngOnInit() {
    this.formAuthLogin = this.formBuilder.group({
      inputUsername: ['', Validators.compose([Validators.required])],
      inputPassword: ['', Validators.compose([Validators.required])]
    });

    this.formAuthLogin.controls['inputUsername'].valueChanges.subscribe(inputUsername => {
      if(inputUsername && this.showAlertDanger){
        this.showAlertDanger = false;
        this.responseHttpMessage = "";
      }
    });

    this.formAuthLogin.controls['inputPassword'].valueChanges.subscribe(inputPassword => {
      if(inputPassword && this.showAlertDanger){
        this.showAlertDanger = false;
        this.responseHttpMessage = "";
      }
    });

    const indicatorsCarousel = this.elem.nativeElement.querySelectorAll('.carousel-indicators');
    indicatorsCarousel.forEach((indicator: any) => {
      this.renderer.setStyle(indicator, 'bottom', '60px');
      this.renderer.setStyle(indicator, 'right', '60%');
    });
    if (screen.width <= this.breakpoint) {
      this.renderer.setStyle(this.wrapperFormViewLogin.nativeElement, "width", screen.width -  15 + "px");
    }
    
  }

  ngAfterViewInit() {

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
    }
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

  get formGroupControls() {
    return this.formAuthLogin.controls
  }

  showViewFormLogin(event: any): void{
    event.preventDefault();
    this.formAuthLogin.reset();
    this.showViewLoginFail = false;
  }

  authLoginUser(formAuthLogin: UntypedFormGroup): void{
    if(!formAuthLogin.value.inputUsername){
      this.functionsGlobalsService.showMessageRequest(1, this.languageViewLoginModel.titleAlert || "", this.languageViewLoginModel.inputUsernameErrorRequired || "", this.functionsGlobalsService.codeError, null);
    }
    if(!formAuthLogin.value.inputPassword){
      this.functionsGlobalsService.showMessageRequest(1, this.languageViewLoginModel.titleAlert || "", this.languageViewLoginModel.inputPasswordErrorRequired || "", this.functionsGlobalsService.codeError, null);
    }
    if(formAuthLogin.value.inputUsername && formAuthLogin.value.inputPassword){
      this.functionsGlobalsService.showMessageRequest(2, this.languageViewLoginModel.titleAlert || "", this.languageViewLoginModel.messageAlertLoadingRequest || "", 0, null);
      let loginAuthInterface: LoginAuthInterface = {};
      loginAuthInterface.password = formAuthLogin.value.inputPassword;
      loginAuthInterface.username =  formAuthLogin.value.inputUsername;
      this.authLoginService.authLoginUser(loginAuthInterface).subscribe({ next: (responseRequest) => { 
          if(responseRequest.status == 200){
            setTimeout(() => {
              this.functionsGlobalsService.closeAlertRequest();
              this.authLoginService.setUsername(responseRequest?.result?.usuaUsername);
              let tokenAccess = responseRequest?.result?.jwtToken;
              this.authLoginService.setToken(tokenAccess);    
              this.authLoginService.setIsLoggedin("SI");    
              this.authLoginService.setEmail(responseRequest?.result?.usuaEmail);                
              this.router.navigate(['/dashboard']);
            }, 1000);
          }else{
            this.functionsGlobalsService.closeAlertRequest();
            this.showAlertDanger = true;
            this.responseHttpMessage = responseRequest.message || "";
          }
        }, error: (responseRequestError) => { 
          this.functionsGlobalsService.closeAlertRequest();
          if(responseRequestError){
            this.languageViewLoginModel.messageOneViewLoginFail = this.functionsGlobalsService.showListErrorsMessageRequest(responseRequestError.error.message);
          }          
          this.showViewLoginFail = true;
        }, complete: () => { 
          //this.functionsGlobalsService.closeAlertRequest();
        } 
      });
    }
  }


  onResize(event: any) {
    const widthView = event.target.innerWidth;
    if (widthView <= this.breakpoint) {
      this.renderer.setStyle(this.wrapperFormViewLogin.nativeElement, "width", widthView -  15 + "px");
    } else {
      this.renderer.setStyle(this.wrapperFormViewLogin.nativeElement, "width", (widthView - (widthView - 485)) + "px");
    }
  }
}
