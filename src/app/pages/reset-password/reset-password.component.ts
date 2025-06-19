import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralModel } from 'src/app/core/models/general.model';
import { LoginAuthInterface } from '../../core/interfaces/login/loginAuth-interface';
import { LanguageViewResetPasswordModel } from '../../core/models/language/languageViewResetPassword.model';
import { FunctionsGlobalsService } from '../../core/services/functionsGlobals/functionsglobals.service';
import { LanguagesServicesService } from '../../core/services/languages/languages-services.service';
import { AuthLoginService } from '../../core/services/login/authlogin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('wrapperFormViewLogin', {static: false}) wrapperFormViewLogin: ElementRef = {} as ElementRef;
  @ViewChild('inputUsername', {static: false}) inputUsername: ElementRef = {} as ElementRef;
  showMaxLengthCharacterInputUsername: boolean = false;
  showAlertDanger: boolean = false;
  showViewResetPasswordFail: boolean = false;
  lengthCharacterInputUsername: number = 0;
  maxLengthCharacterInputUsername: number = 50;
  formAuthResetPassword: UntypedFormGroup = new UntypedFormGroup({});
  responseHttpMessage: string = "";
  languageViewResetPasswordModel: LanguageViewResetPasswordModel = new LanguageViewResetPasswordModel();
  breakpoint: number = 768;
  titleWindowPlatform: string = this.generalModel.titleWindowPlatform || ""; 
  namePlatform : string = this.generalModel.namePlatform || ""; 
  urlApp: string = this.generalModel.urlApp || "";

  constructor(
     // private webSocketService: WebSocketService,
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
    this.formAuthResetPassword = this.formBuilder.group({
      inputUsername: ['', Validators.compose([Validators.required])]
    });

    this.formAuthResetPassword.controls['inputUsername'].valueChanges.subscribe(inputUsername => {
      if(inputUsername && this.showAlertDanger){
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
      if(event.target.name == "inputUsername"){
        this.lengthCharacterInputUsername = legthCharacter;
        event.target.value = (event.target.value) ? (event.target.value).toLowerCase() : '';
      }
    }
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
    return this.formAuthResetPassword.controls
  }

  showViewFormResetPassword(event: any): void{
    event.preventDefault();
    this.formAuthResetPassword.reset();
    this.showViewResetPasswordFail = false;
  }

  authResetPasswordUser(formAuthResetPassword: UntypedFormGroup): void{
    if(!formAuthResetPassword.value.inputUsername){
      this.functionsGlobalsService.showMessageRequest(1, this.languageViewResetPasswordModel.titleAlert || "", this.languageViewResetPasswordModel.inputUsernameErrorRequired || "", this.functionsGlobalsService.codeError, null);
    }
    if(formAuthResetPassword.value.inputUsername){
      this.functionsGlobalsService.showMessageRequest(2, this.languageViewResetPasswordModel.titleAlert || "", this.languageViewResetPasswordModel.messageAlertLoadingRequest || "", 0, null);
      let loginAuthInterface: LoginAuthInterface = {};
      loginAuthInterface.username = formAuthResetPassword.value.inputUsername;
      this.authLoginService.authResetPasswordUser(loginAuthInterface).subscribe({ next: (responseRequest) => { 
          if(responseRequest.status == 200){
            setTimeout(() => {
              this.functionsGlobalsService.closeAlertRequest();
              this.functionsGlobalsService.showMessageRequest(1, this.languageViewResetPasswordModel.titleAlertSuccessResetPassword || "", responseRequest.message || "", this.functionsGlobalsService.codeSuccess, () => {
                this.formAuthResetPassword.reset();
              });
            }, 3000);
          }else{
            this.functionsGlobalsService.closeAlertRequest();
            this.showAlertDanger = true;
            this.responseHttpMessage = responseRequest.message || "";
          }
        }, error: (responseRequestError) => { 
          this.functionsGlobalsService.closeAlertRequest();
          if(responseRequestError){
            this.languageViewResetPasswordModel.messageOneViewResetPasswordFail = this.functionsGlobalsService.showListErrorsMessageRequest(responseRequestError.error.message);
          }          
          this.showViewResetPasswordFail = true;
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
