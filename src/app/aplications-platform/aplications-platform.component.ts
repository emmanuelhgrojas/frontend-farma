import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-aplications-platform',
  templateUrl: './aplications-platform.component.html',
  styleUrls: ['./aplications-platform.component.css']
})
export class AplicationsPlatformComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private router: Router) { 
    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
  }

}
