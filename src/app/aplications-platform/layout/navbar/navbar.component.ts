import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/core/services/login/authlogin.service';
import { GeneralModel } from 'src/app/core/models/general.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public username: string = "";
  public emailUser: string = "";

   public urlApp: string = this.generalModel.urlApp || "";

  constructor(
    private generalModel: GeneralModel,
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private authLoginService: AuthLoginService
  ) { }

  ngOnInit(): void {
    this.emailUser = this.authLoginService.getEmail();
    this.username = this.authLoginService.getUsernameCurrent();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.clear();
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

}
