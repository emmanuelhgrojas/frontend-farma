import { Injectable } from '@angular/core';

@Injectable()
export class LanguageViewLoginModel {
    
    titlePlatform?: string;
    subTitlePlatform?: string;
    tittleHeader?: string;
    labelUsername?: string;
    labelPassword?: string;
    placeHolderInputUsername?: string;
    placeHolderInputPassword?: string;
    buttonLogin?: string;
    spanLinkRememberPassword?: string;
    inputUsernameErrorRequired?: string;
    inputUsernameErrorMaxLength?: string;
    inputPasswordErrorRequired?: string;
    inputPasswordErrorMaxLength?: string;
    inputPasswordErrorsMinLength?: string;
    titleAlert?: string;
    messageAlertLoadingRequest?: string;
    titleAlertSuccessLogin?: string;
    titleViewLoginFail?: string;
    buttonGoToFormLogin?: string;
    messageOneViewLoginFail?: string;
    messageSecondViewLoginFail?: string;
    titleFollowSocialNetworks?: string;
    titleSliderOne?: string;
    subtitleSliderOne?: string;
    titleSliderSecond?: string;
    subtitleSliderSecond?: string;
    titleSliderThird?: string;
    subtitleSliderThird?: string;


    constructor() {
        this.titlePlatform = "";
        this.subTitlePlatform = "";
        this.tittleHeader = "";
        this.labelUsername = "";
        this.labelPassword = "";
        this.placeHolderInputUsername = "";
        this.placeHolderInputPassword = "";
        this.buttonLogin = "";
        this.spanLinkRememberPassword = "";
        this.inputUsernameErrorRequired = "";
        this.inputUsernameErrorMaxLength = "";
        this.inputPasswordErrorRequired = "";
        this.inputPasswordErrorMaxLength = "";
        this.inputPasswordErrorsMinLength = "";
        this.titleAlert = "";
        this.messageAlertLoadingRequest = "";
        this.titleAlertSuccessLogin = "";
        this.titleViewLoginFail = "";
        this.buttonGoToFormLogin = "";
        this.messageOneViewLoginFail = "";
        this.messageSecondViewLoginFail = "";
        this.titleFollowSocialNetworks = "";
        this.titleSliderOne = "";
        this.subtitleSliderOne = "";
        this.titleSliderSecond = "";
        this.subtitleSliderSecond = "";
        this.titleSliderThird = "";
        this.subtitleSliderThird = "";
    }

}