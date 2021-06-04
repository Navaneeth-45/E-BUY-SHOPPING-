import { Component, Input, OnInit } from '@angular/core';
import { Laptops } from '../models/laptop.model';

@Component({
  selector: 'app-laptopsdetails',
  templateUrl: './laptopsdetails.component.html',
  styleUrls: ['./laptopsdetails.component.css']
})
export class LaptopsdetailsComponent  {

  @Input() productObj:Laptops;
}
