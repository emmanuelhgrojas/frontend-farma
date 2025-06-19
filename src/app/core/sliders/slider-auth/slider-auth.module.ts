import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderAuthComponent } from './slider-auth.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    SliderAuthComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  exports: [
    SliderAuthComponent
  ]
})
export class SliderAuthModule { }
