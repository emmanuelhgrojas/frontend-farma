//Import Libraries Interns
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import Libraries Externs
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//Import Modules
import { ResetPassworRoutingModule, routableResetPasswordComponents } from './reset-password-routing.module';
import { SliderAuthModule } from '../../core/sliders/slider-auth/slider-auth.module';
//Import Components
import { ResetPasswordComponent } from './reset-password.component';


@NgModule({
  declarations: [
    routableResetPasswordComponents,
    ResetPasswordComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ResetPassworRoutingModule,
    SliderAuthModule
  ],
  providers: []
})
export class ResetPasswordModule { }
