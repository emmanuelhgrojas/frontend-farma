//Import Libraries Interns
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Import Libraries Externs

//Import Modules
import { LoginRoutingModule, routableLoginComponents } from './login-routing.module';
import { SliderAuthModule } from '../../core/sliders/slider-auth/slider-auth.module';
//Import Components
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    routableLoginComponents,
    LoginComponent
  ],
  imports: [    
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SliderAuthModule
  ],
  providers: []
})
export class LoginModule { }
