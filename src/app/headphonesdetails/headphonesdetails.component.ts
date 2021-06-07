import { Component, Input, OnInit } from '@angular/core';
import { Headphones } from '../models/headphones.model';

@Component({
  selector: 'app-headphonesdetails',
  templateUrl: './headphonesdetails.component.html',
  styleUrls: ['./headphonesdetails.component.css']
})
export class HeadphonesdetailsComponent  {
  @Input() productObj:Headphones;

}
