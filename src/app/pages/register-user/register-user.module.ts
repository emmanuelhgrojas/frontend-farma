import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SliderAuthModule } from 'src/app/core/sliders/slider-auth/slider-auth.module';
import { RegisterUserComponent } from './register-user.component';
import { RegisterUserRoutingModule, routableRegisterUserComponent } from './register-user-routing.module';

@NgModule({
  declarations: [
    routableRegisterUserComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,    
    SliderAuthModule,
    RegisterUserRoutingModule
  ],
  exports: [
    RegisterUserComponent
  ],
  
})
export class RegisterUserModule { }
