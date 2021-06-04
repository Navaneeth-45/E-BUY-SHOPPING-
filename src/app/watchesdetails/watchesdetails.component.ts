import { Component, Input, OnInit } from '@angular/core';
import { Watches } from '../models/watches.model';

@Component({
  selector: 'app-watchesdetails',
  templateUrl: './watchesdetails.component.html',
  styleUrls: ['./watchesdetails.component.css']
})
export class WatchesdetailsComponent  {

  
  @Input() productObj:Watches;
}
