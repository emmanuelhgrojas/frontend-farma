//Import Libraries Interns
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//Import Libraries Externs
//Import Modules
import { FeatherIconModule } from '../core/directives/feather-icon/feather-icon.module';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AplicationsPlatformRoutingModule, routableAPlicationsPlatformComponents } from './aplications-platform-routing.module';
//Import Components
import { AplicationsPlatformComponent } from './aplications-platform.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyComponent } from './layout/body/body.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ContentAnimateDirective } from '../core/directives/content-animate/content-animate.directive';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    routableAPlicationsPlatformComponents,
    AplicationsPlatformComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    NavbarComponent,
    ContentAnimateDirective
  ],
  imports: [
    CommonModule,
    AplicationsPlatformRoutingModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    FeatherIconModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AplicationsPlatformModule { }
