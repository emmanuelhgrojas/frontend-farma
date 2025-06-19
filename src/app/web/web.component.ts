import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralModel } from '../core/models/general.model';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {
  defaultNavActiveId = 1;
  public urlApp: string = this.generalModel.urlApp || "";
  
  constructor(private generalModel: GeneralModel, private router: Router) { }

  ngOnInit(): void {
  }

}
