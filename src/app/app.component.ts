//Import Libraries Interns
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
//Import Services
import { FunctionsGlobalsService } from './core/services/functionsGlobals/functionsglobals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private functionsGlobalsService: FunctionsGlobalsService,
    private swUpdate: SwUpdate,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private titleService: Title) {}

  ngOnInit() {
    this.loadTitleDinamicApp();
    this.reloadCacheApp();
  }

  reloadCacheApp(): void {
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() => {
        this.functionsGlobalsService.showMessageRequest(1, '', '', this.functionsGlobalsService.codeSuccess, () => {
          location.reload();
        });
      });
    }
  }

  loadTitleDinamicApp(): void{
    /* Title dinamic for the App */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).pipe(
      map(() => this.activatedRouter)
    ).pipe(
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
    ).pipe(
      filter((route) => route.outlet === 'primary')
    ).pipe(
      mergeMap((route) => route.data)
    ).subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
