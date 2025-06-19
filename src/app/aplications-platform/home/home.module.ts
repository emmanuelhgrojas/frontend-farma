//Import Libraries Interns
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Import Libraries Externs
//Import Modules
import { HomeRoutingModule, routableHomeComponents } from './home-routing.module';
//Import Components
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    routableHomeComponents
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule { }
