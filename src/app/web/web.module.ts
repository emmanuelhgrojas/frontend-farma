
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRoutingModule, routableWebComponents } from './web-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WebComponent } from './web.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    routableWebComponents,
    WebComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    NgbNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class WebModule { }
