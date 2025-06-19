import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralModel } from '../../models/general.model';

@Component({
  selector: 'app-slider-auth',
  templateUrl: './slider-auth.component.html',
  styleUrls: ['./slider-auth.component.css']
})
export class SliderAuthComponent implements OnInit {

  @Input() languageViewModel: any;
  public urlApp: string = this.generalModel.urlApp || "";
  
  constructor(private generalModel: GeneralModel) { }

  ngOnInit(): void {
  }

  
}
