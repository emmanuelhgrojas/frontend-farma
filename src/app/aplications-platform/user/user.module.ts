//Import Libraries Interns
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Import Libraries Externs

//Import Modules
import { routableUserComponents, UserRoutingModule } from './user-routing.module';
import { DataTablesModule } from 'angular-datatables';
//Import Components
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    routableUserComponents,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    DataTablesModule
    
  ]
})
export class UserModule { }
